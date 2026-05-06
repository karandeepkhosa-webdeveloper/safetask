import mongoose from "mongoose"; 

const ConnectDB = async () => {

    try {
        if (mongoose.connections[0].readyState) {
            console.log("already connected")
            return; // already connected
        }


        await mongoose.connect("mongodb://localhost:27017/MyTodoListData")
        console.log("Database Connected")
    } catch (err) {
        console.log("Database Connection Error: ", err)
    }


};

export default ConnectDB;