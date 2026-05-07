import mongoose from "mongoose";

const loginmodel = new mongoose.Schema({
    userCred:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Loginform = mongoose.model("Loginform", loginmodel)
export default Loginform