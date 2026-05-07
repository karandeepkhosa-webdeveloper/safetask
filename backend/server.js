import express from "express"
import ConnectDB from "./db/ConnectDB.js"
import Todo from "./models/todos.js"
import cors from "cors"
import dotenv from "dotenv"
import Signupform from "./models/signupmodel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authmiddleware from "./middleware.js"



const app = express()
dotenv.config()
const port = process.env.PORT


app.use(express.json())
app.use(cors())
await ConnectDB()



app.get('/', async (req, res) => {
    
    res.send({ Connected: true, from: "Backend" })
})


app.get('/sendData', authmiddleware, async (req, res) => {

    const username = req.user.username
    console.log("username is ", username)
    let backTodos = await Todo.find({ username })
    res.send({ message: "connection success", content: backTodos })



})
app.put('/update/:id', authmiddleware, async (req, res) => {

    const data = req.body
    try {
        const username = req.user.username
        let upd = await Todo.findOneAndUpdate({ id: req.params.id, username }, { $set: data.content }, { returnDocument: 'after', upsert: true })
        console.log(upd, req.params.todoText)
        if (upd) {
            console.log("insert or update request of :", data)
            console.log("updated data from update api:", upd)
            res.send({ Connected: true, message: "data updated  from update api" })
        }
        else {
            console.log("data not inserted or updated  from update api")
            res.send({ Connected: true, message: "data not updated from update api" })
        }
    } catch (error) { console.log("error happended in backend in findoneandupdate", error) }

})
app.delete('/delete/:id', authmiddleware, async (req, res) => {
    // let data = req.body
    const username = req.user.username
    console.log("deleted data: ", req.params.id, "req.userid is ", req.user)
    await Todo.findOneAndDelete({ id: req.params.id, username })
    res.send({ from: "backend", message: "deleteData running" })

})


app.post("/signup", async (req, res) => {

    try {

        const data = req.body
        console.log(data)

        let findemail = await Signupform.findOne({ email: data.email })
        if (findemail) {
            console.log(findemail)
            res.send({ reason: "email", message: "email already registered" })
        }
        else {
            const findUsername = await Signupform.findOne({ username: data.username })
            if (findUsername) {
                res.send({ reason: "username", message: "Username not available, try another one" })
            }
            else {
                const hashed = await bcrypt.hash(data.password, 10)
                let inserted = await Signupform.create({
                    email: data.email,
                    username: data.username,
                    password: hashed
                })
                console.log(inserted)
                res.send({ reason: "success", message: "Account Created Successfully, Now please login" })
            }
        }

    } catch (error) {
        console.log("error happened in backend signup post request", error)
        res.status(500).send({
            error: error.message
        })
    }

})

app.post("/login", async (req, res) => {

    try {

        let data = req.body
        console.log(data)
        let findCredbyemail = await Signupform.findOne({ email: data.useremail })
        let findCredbyusername = await Signupform.findOne({ username: data.useremail })

        if (findCredbyemail) {
            let verify1 = await bcrypt.compare(data.password, findCredbyemail.password)
            if (verify1) {
                console.log("i am in login by email", verify1)
                const token = jwt.sign({ id: findCredbyemail._id, username: findCredbyemail.username }, process.env.JWT_SECRET)
                res.send({ reason: "login success", token, name: findCredbyemail.username })
            }
            else {
                res.send({ reason: "invalid password", message: "invalid password" })
            }
        }
        else {

            if (findCredbyusername) {
                let verify2 = await bcrypt.compare(data.password, findCredbyusername.password)
                if (verify2) {
                    const token = jwt.sign({ id: findCredbyusername._id, username: findCredbyusername.username }, process.env.JWT_SECRET)
                    res.send({ reason: "login success", token, name: findCredbyusername.username })
                }
                else {
                    res.send({ reason: "invalid password", message: "invalid password" })
                }
            }
            else {
                res.send({ reason: "not found", message: "User not found" })
            }
        }
    } catch (error) {
        console.log("error happened in backend login post request")
        res.status(500).send({
            error: error.message
        })
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
