
import React from 'react'
import { useForm, } from "react-hook-form"
import { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()


  const onSubmit = async (params) => {
    let res = await fetch("http://localhost:3000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        
      },
      body:JSON.stringify(params)
    })
    let data = await res.json()
    console.log(data)
    if (data.reason === "not found"){
      setError("useremail",{
        type:"manual",
        message:data.message
      })
    }
    if (data.reason === "invalid password"){
      setError("password",{
        type:"manual",
        message:data.message
      })
    }
    if(data.reason==="login success"){
      localStorage.setItem("token", data.token)
      localStorage.setItem("name", data.name)
      navigate("/todos");
    }
   
  }

  const [showpass, setshowpass] = useState(false)


  return (
    <div className='text-black'>
      <div className="actualDiv container mx-auto w-full md:w-[40vw] bg-white min-h-screen flex flex-col items-center py-16">
        <h2 className='font-bold text-2xl  py-6'>Hi, Welcome Back!</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 w-80'>
            <div>
              <label htmlFor="formusername"><p className='text-gray-600 font-bold py-1'>Email</p></label>
              <input id='formusername' {...register("useremail", { required: "username or email is required", minLength: { value: 6, message: "minimum 6 charachters required" } })} placeholder='Username or Email' type="text" className='rounded-xl w-full' />
              {errors.useremail && <div className='text-red-500 text-sm font-bold'>{errors.useremail.message}</div>}
            </div>
            <div>
              <label htmlFor="formpassword"><p className='text-gray-600 font-bold py-1'>Password</p></label>
              <div className='relative'>
                <input id='formpassword'  {...register("password", { required: "password is required", minLength: { value: 6, message: "minimum 6 charachters required" } })} placeholder='Enter Your Password' type={showpass ? "text" : "password"} className='rounded-xl w-full' />
                <button type='button' onClick={() => { showpass ? setshowpass(false) : setshowpass(true) }} className='absolute text-sm font-bold right-4 border px-2 rounded-xl top-1/4 bg-gray-200'>{showpass ? "Hide" : "Show"}</button>
              </div>
              {errors.password && <div className='text-red-500 text-sm font-bold'>{errors.password.message} </div>}
            </div>
            <button type='submit' className='bg-blue-500 py-2 my-2 font-bold hover:bg-blue-600 transition-all duration-300 rounded-xl cursor-pointer'>Login</button>
          </div>
        </form>
        <Link to={"/signup"} className='font-bold flex justify-center cursor-pointer my-3 hover:underline'> <p className='text-black '> Don't Have Account?</p> <p className='text-blue-700 '>Sign Up</p></Link> 

      </div>
    </div>
  )
}

export default Login
