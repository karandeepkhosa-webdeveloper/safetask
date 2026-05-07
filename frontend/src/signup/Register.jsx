import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'



const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [showpass, setshowpass] = useState(false)
  const [accountCreated, setaccountCreated] = useState(false)
  const obj = { name: "karan", isloggedin: true }


  const onSubmit = async (params) => {

    try{

      
      let res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      })
      let data = await res.json()
      console.log(data)
    
    
      if (data.reason === "email") {
        setError("email", {
        type: "manual",
        message: data.message
      })
    }
    if (data.reason === "username") {
      setError("username", {
        type: "manual",
        message: data.message
      })
    }
    if (data.reason === "success")
    {
      setaccountCreated(true)
    }


  }catch(error){
    console.log("error happened in register.jsx", error)
  }
  }
  
  // const first = createContext(obj)
  
  
  
  
  return (
    <div className='text-black'>
      <div className="actualDiv container mx-auto w-full xl:w-[40vw] bg-white min-h-screen flex flex-col items-center py-16">
        <h2 className='font-bold text-2xl py-6'>Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 w-80'>
            <div>
              <label htmlFor="formEmail"><p className='text-gray-600 font-bold py-1'>Email</p></label>
              <input id='formEmail' {...register("email", { required: "email is required", minLength: { value: 6, message: "minimum 6 charachters required" } })} placeholder='Email' type="email" className='rounded-xl w-full' />
              {errors.email && <div className='text-red-500 text-sm font-bold'>{errors.email.message}</div>}
            </div>
            <div>
              <label htmlFor="forUsername"><p className='text-gray-600 font-bold py-1'>Username</p></label>
              <input id='formUsername' {...register("username", { required: "username is required", minLength: { value: 6, message: "minimum 6 charachters required" } })} placeholder='Username' type="text" className='rounded-xl w-full' />
              {errors.username && <div className='text-red-500 text-sm font-bold'>{errors.username.message}</div>}
            </div>
            <div>
              <label htmlFor="formpassword"><p className='text-gray-600 font-bold py-1'>Password</p></label>
              <div className='relative'>
                <input id='formpassword' {...register("password", { required: "password is required", minLength: { value: 6, message: "minimum 6 charachters required" } })} placeholder='Enter Your Password' type={showpass ? "text" : "password"} className='rounded-xl w-full' />
                <button type='button' onClick={() => { showpass ? setshowpass(false) : setshowpass(true) }} className='absolute text-sm font-bold right-4 border px-2 rounded-xl top-1/4 bg-gray-200'>{showpass ? "Hide" : "Show"}</button>
              </div>
              {errors.password && <div className='text-red-500 text-sm font-bold'>{errors.password.message}</div>}
            </div>
            <button type='submit' className='bg-blue-500 py-2 my-2 font-bold hover:bg-blue-600 transition-all duration-300 rounded-xl cursor-pointer'>SignUp</button>
          </div>
        </form>
        {accountCreated && <div className='text-green-500 font-bold text-sm'>Account created Succesfully, <Link to={"/login"} className='text-blue-700 hover:text-blue-500 underline'>Now Login please</Link></div>}
        <Link to={"/login"} className='font-bold flex justify-center cursor-pointer my-3 hover:underline'> <p className='text-black '> Already have a Account?</p> <p className='text-blue-700 '>Login</p></Link>

      </div>
    </div>
  )
}

export default Signup
