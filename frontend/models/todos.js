import mongoose from 'mongoose';
const { Schema } = mongoose;

const todosSchema = new mongoose.Schema({
     
     id:{
      type:String,
      required:true,
      unique:true
     } , 
     todoText:{
      type:String,
      required:true
     }, 
     isCompleted:{
      type:Boolean,
      default:false
     },
     username:{
          type:String,
          required:true

     }
})

const Todo = new mongoose.model("Todo", todosSchema)
export default Todo


