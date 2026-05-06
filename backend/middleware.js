import jwt from "jsonwebtoken"

const Authmiddleware = (req,res,next) =>{

    let token = req.headers.authorization.split(" ")[1]
    
    if(!token){return res.status(401).send("NO token")}
    
    try{
        let decoded = jwt.verify(token, "secretkey")
        console.log("decoded from middleware is ", decoded)
        req.user = decoded
        next();
    }catch{
        return res.status(401).send("invalid token")
    }


};

export default Authmiddleware;