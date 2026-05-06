import React from 'react' 
import "flowbite"


const ListStyle = ({ prop }) => {
    // console.log(e)
    const {e, handleDone, handleEdit, handleDelete} = prop;
    console.log(e)
    
  return (
    <div className={`flex justify-between  items-center h-12  ${e.isCompleted?"bg-gray-400":"bg-slate-200"}  my-2 mx-2 sm:mx-0   rounded-2xl`}>

                  <div className={` md:w-[65%] sm:w-[50%] font-bold ${e.isCompleted ? "text-gray-500" : "text-black"} text-start px-2`}>
                    <input type="checkbox" name="" id="green-checkbox" className='w-4 h-4 text-green-600 bg-white border-slate-500 rounded-xs ring-green-500 dark:hover:ring-green-600  hover:ring-2 m-2' onChange={() => handleDone(e.id)} checked={e.isCompleted} />
                    <span>
                    {e.todoText}
                    </span>
                  </div>


                  <div className='flex md:w-[35%] sm:w-[50%] justify-center gap-2   px-4'>
                    <button onClick={() => { handleEdit(e.id) }} type="button" className="cursor-pointer text-white bg-linear-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800  font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5">Edit</button>
                    <button onClick={() => { handleDelete(e.id) }} type="button" className="cursor-pointer text-white bg-linear-to-r from-red-400 via-red-500 to-red-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5">Remove</button>                    
                  </div>

                </div>
  )
}

export default ListStyle
