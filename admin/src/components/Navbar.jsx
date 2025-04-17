import React from 'react'

const Navbar = ({ setToken }) => {
  return (
    <>
      <div className='flex items-center bg-slate-800 py-4 px-[4%] justify-between sticky top-0'>
        <p className='text-pink-600 text-lg'>Admin Panel</p>
        <button
          onClick={() => setToken('')}
          className="bg-white text-center w-36 rounded-2xl h-9 relative text-black text-xl font-semibold group"
          type="button"
        >
          <div
            className="bg-red-400 rounded-xl h-7 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[135px] z-10 duration-500"
          >
            <svg width="25px" height="25px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.8160000000000001"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8L22 12M22 12L18 16M22 12H9M15 4.20404C13.7252 3.43827 12.2452 3 10.6667 3C5.8802 3 2 7.02944 2 12C2 16.9706 5.8802 21 10.6667 21C12.2452 21 13.7252 20.5617 15 19.796" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>
          <p className="translate-x-2">Log Out</p>
        </button>
      </div>
    </>
  )
}

export default Navbar;