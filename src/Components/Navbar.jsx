import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-blue-500 text-white py-4 w-full">
        <div className="logo mx-10">
            <span className='font-bold text-3xl cursor-pointer'>myToDo</span>
        </div>
        <ul className="flex gap-7 mx-10">
            <li className='cursor-pointer hover:font-bold transition-all text-l px-2'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all text-l px-2'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
