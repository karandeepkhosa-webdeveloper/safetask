import mongoose from "mongoose";  
import dotenv from "dotenv"

dotenv.config()
const ConnectDB = async () => {

    try {
        if (mongoose.connections[0].readyState) {
            console.log("already connected")
            return; // already connected
        }


        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected")
    } catch (err) {
        console.log("Database Connection Error: ", err)
    }


};

export default ConnectDB;