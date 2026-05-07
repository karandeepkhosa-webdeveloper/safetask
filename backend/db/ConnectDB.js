import mongoose from "mongoose"; 

const ConnectDB = async () => {

    try {
        if (mongoose.connections[0].readyState) {
            console.log("already connected")
            return; // already connected
        }


        await mongoose.connect("mongodb+srv://karandeepkhosa_mogodb_atlas:karan%40123@safetask-cluster.mj0w2sl.mongodb.net/MyTodoListData?retryWrites=true&w=majority")
        console.log("Database Connected")
    } catch (err) {
        console.log("Database Connection Error: ", err)
    }


};

export default ConnectDB;