import mongoose from "mongoose";


const Signupschema = new mongoose.Schema({
    email:{ 
        type: String,
        required:true,
        unique:true      
     },
     username:{
        type: String,
        required:true,
        unique:true
     },
     password:{
        type: String,
        required:true,
        
     }
});

const Signupform = new mongoose.model("Signupform", Signupschema)
export default Signupform