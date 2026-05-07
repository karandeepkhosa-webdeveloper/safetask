import './App.css'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { useRef } from 'react'
import Login from "./Login/Login"
import Signup from './signup/Register'
import ListStyle from '../components/ListStyle'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function App() {
  const [TaskTab, setTaskTab] = useState("todo")
  const [TodoObj, setTodoObj] = useState({ id: "", todoText: "", isCompleted: false, username:"" })
  const [TodoArr, setTodoArr] = useState([])
  const [CompletedTask, setCompletedTask] = useState([])
  const [PendingTask, setPendingTask] = useState([])
  const firstRefresh = useRef("true")
  const connectionKey = "connectkardo"
  const [isLoggedIn, setisLoggedIn] = useState(true)
  const navigate = useNavigate()

  

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
     
    }
    else{
      navigate("/login")
    }
  })

  const conBackend = async () => {

    try {
      const res = await fetch("https://safetask-backend.onrender.com/")
      if (res.ok) {
        const data = await res.json()
        console.log(data)
      }
      else {
        console.log("connection failed catched the error")
      }

    } catch (error) {
      console.log("failed to connect", error)
    }
  }
  

  const getdata = async () => {
    try {
      let res = await fetch("https://safetask-backend.onrender.com/sendData",{
        method:"GET",
        headers:{
          "authorization": "bareer "+localStorage.getItem("token")
        }
      })
      let data = await res.json()
      // console.log(data)
      return data.content

    } catch (error) {
      console.log("error catched from get data:", error)
    }
  }

  const updateData = async (params) => {
    try {
      let res = await fetch(`https://safetask-backend.onrender.com/update/${params.id}`, {
        method: "PUT",  
        headers: {
          "Content-Type": "application/json",
          "authorization": "bareer "+localStorage.getItem("token")
        },
        body: JSON.stringify({ from: "sending data from frontend",  content: params })
      })
      let data = await res.json()
      console.log(data)
    } catch (error) {
      console.log("error catched from update Data:", error)
    }

  }

  const deleteData = async ( dataToDelete) => {
    
    try {
      let res = await fetch(`https://safetask-backend.onrender.com/delete/${dataToDelete[0].id}`, {
        method: "DELETE",
        headers:{
          "authorization":"bareer "+localStorage.getItem("token")
        }

      })

      let data = await res.json()
      console.log(data)
    } catch (error) { console.log("error catched in deleteData", error) }

  }
  

  useEffect(() => {
    conBackend();
    getdata().then((d) => {

      const backData = d
      if (backData) {
        let data = backData
        console.log(data)
        setTodoArr(data)

        setCompletedTask(data.filter((params) => {
          if (params.isCompleted === true) {
            return params
          }

        }))

        setPendingTask(data.filter((p) => {
          if (p.isCompleted !== true) {
            return p
          }
        }))


        console.log(data)
      }
      else {
        console.log("Localstorage is empty")

      }
    })
  }, [])

  useEffect(() => {

    if (JSON.parse(localStorage.getItem("state"))) {
      let state = JSON.parse(localStorage.getItem("state"))
      setTaskTab(state)
    }
    // console.log(TaskTab)

  }, [])



  useEffect(() => {
    if (firstRefresh.current) {
      firstRefresh.current = false
    }
    else {
      localStorage.setItem("state", JSON.stringify(TaskTab))
    }
  }, [TaskTab])



  const saveInBack = (params) => {

    updateData(params)

  }


  const handleChange = (e) => {
    setTodoObj({ ...TodoObj, [e.target.name]: e.target.value })
    // console.log(TodoObj)

  }

  const handleSubmit = async () => {
    const data = TodoArr
    let username = localStorage.getItem("name")
    let newData = {}
    if(TodoObj.id===""){
      newData = { ...TodoObj, id: uuidv4(), username }
    }
    else{
      newData = {...TodoObj}
    }
    const updated = [...TodoArr, newData]
    TodoObj.todoText = ""
    console.log("submitting element is ", newData)
    setTodoArr(updated)
    saveInBack(newData)
    // console.log(updated)

    setCompletedTask(updated.filter((p) => {
      if (p.isCompleted === true) {
        return p
      }
    }))

    setPendingTask(updated.filter((p) => {
      if (p.isCompleted !== true) {
        return p
      }
    }))


  }


  const handleDone = (e) => {


    const data = TodoArr
    const updated = data.map(params => {
      if (params.id === e) {

        params.isCompleted ? params.isCompleted = false : params.isCompleted = true

      }
      return params

    })
    const updatedElement = updated.filter((params)=>{
      return(params.id===e)
      
    })
    console.log("updated element is: ",...updatedElement)
    console.log(updated)
    saveInBack(...updatedElement)

    setCompletedTask(updated.filter((p) => {
      if (p.isCompleted === true) {
        return p
      }
    }))

    setPendingTask(updated.filter((p) => {
      if (p.isCompleted !== true) {
        return p
      }
    }))



  }

  const handleEdit = (e) => {
    const data = TodoArr
    const updated = data.filter((p) => {
      return p.id === e
    })
    setTodoObj(...updated)
    setTodoArr(data.filter((f) => {
      return f.id !== e
    }))
    console.log(...updated)

    setCompletedTask(data.filter((p) => {
      if (p.isCompleted === true) {
        return p
      }
    }))

    setPendingTask(data.filter((p) => {
      if (p.isCompleted !== true) {
        return p
      }
    }))
  }

  const handleDelete = (e) => {
    const data = TodoArr
    const updated = data.filter((p) => {
      return p.id !== e
    })
    const dataToDelete = data.filter((p)=>{
        return p.id === e
    })
    setTodoArr(updated)
    
    deleteData(dataToDelete)
    // console.log(updated)

    setCompletedTask(updated.filter((p) => {
      if (p.isCompleted === true) {
        return p
      }
    }))

    setPendingTask(updated.filter((p) => {
      if (p.isCompleted !== true) {
        return p
      }
    }))

  }

  if(!isLoggedIn){
    return <Login />
  }

  if(isLoggedIn) { 
    return ( <>
      <Navbar />
      <div className='container xl:w-[50%] lg:w-[65%] md:w-[80%] sm:w-[95%] min-h-screen mx-auto bg-slate-300 text-black text-center '>
        <h1 className='text-3xl pt-20 pb-5 font-bold'>Todo List</h1>  

        <div className='border-none outline outline-slate-700 mx-auto w-[90%] sm:w-[75%] rounded-2xl overflow-hidden flex justify-center items-center'>

          <input id="task" onChange={handleChange} name="todoText" value={TodoObj.todoText} type="text" className='bg-white w-[70%] outline-0 px-3 py-2 rounded-l-2xl  border-0' placeholder='Enter Task' />

          <button id='input1' onClick={handleSubmit} disabled={TodoObj.todoText === "" ? true : false} className=' cursor-pointer save-btn bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  text-white w-[30%] py-2  font-bold disabled:bg-gray-500 disabled:bg-linear-to-r disabled:from-slate-500 disabled:via-slate-600 disabled:to-slate-700 shrink-0 '>Save Task</button>

        </div>

        <div className='todolist pt-10'>
          <div className="upper flex gap-px justify-center">
            <button onClick={() => { setTaskTab("todo") }} className={`  ${(TaskTab === "todo") ? "bg-slate-500" : "bg-slate-700"} font-bold w-36 p-2 cursor-pointer rounded-tl-xl `} >Todo tasks</button>
            <button onClick={() => { setTaskTab("Completed") }} className={` ${TaskTab === "Completed" ? "bg-slate-500" : "bg-slate-700"} font-bold w-36 p-2 cursor-pointer `}>Completed tasks</button>
            <button onClick={() => { setTaskTab("All") }} className={` ${TaskTab === "All" ? "bg-slate-500" : "bg-slate-700"} font-bold w-36 p-2 cursor-pointer rounded-tr-xl`}>All tasks</button>
          </div>

          <div className="todos py-8 md:px-4 bg-slate-500 lg:mx-10 md:mx-5 sm:mx-1 min-h-[50vh] md:rounded-xl">


            {TaskTab === "All" && ((TodoArr.length !== 0) ? TodoArr.map((e) => {
              return <div key={e.id}>

                <ListStyle prop={{ e, handleDone, handleEdit, handleDelete }} />
              </div>

            }) : <div className='font-bold text-white'>Add a new task</div>)}


            {TaskTab === "todo" && ((PendingTask.length !== 0) ? PendingTask.map((e) => {
              return <div key={e.id}>
                <ListStyle prop={{ e, handleDone, handleEdit, handleDelete }} />
              </div>
            })
              : <div className='font-bold text-white'>No Task Pending</div>)}


            {(TaskTab === "Completed") && (
              (CompletedTask.length !== 0) ? CompletedTask.map((e) => {
                return <div key={e.id}>
                  <ListStyle prop={{ e, handleDone, handleEdit, handleDelete }} />
                </div>
              }) : <div className='font-bold text-white'>No Completed Task</div>
            )}


          </div>

        </div>
      </div>
    </>
  )
}}

export default App
