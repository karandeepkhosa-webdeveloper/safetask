import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Navbar = () => {
  const navigate = useNavigate()
  const [Open, setOpen] = useState(false)


  const name = localStorage.getItem("name")
  

  const logOut = () => {
    localStorage.clear()
    navigate("/login")
  }
  const newAcc = () => {
    localStorage.clear()
    navigate("/signup")
  }
  const logToAnother = () => {
    localStorage.clear()
    navigate("/login")
  }


  return (
    <div className='flex justify-between items-center px-4 py-2 bg-black text-white'>
      <div className='font-bold'>SafeTask</div>

      

      <div className='relative'>

        <button onClick={()=>setOpen(!Open)} className="inline-flex items-center justify-center text-white bg-slate-700 box-border border border-transparent hover:bg-slate-500 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none " type="button">
          Hii, {name}
          <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
        </button>
        {/* <!-- Dropdown menu --> */}

        {Open && (<div id="dropdownDelay" className="z-10 absolute top-12 right-0 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
          <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDelayButton">
            <li>
              <button onClick={()=>logOut()} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Log Out</button>
            </li>
            <li>
              <button onClick={()=>newAcc()} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Create new Account</button>
            </li>
            <li>
              <button onClick={()=>logToAnother()} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Login to another Account</button>
            </li>
           
          </ul>
        </div>)}

      </div>

    </div>
  )
}

export default Navbar
