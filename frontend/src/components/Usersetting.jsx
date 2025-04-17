import React, { useContext } from 'react'
import Title from './Title'
import ThemeSwitch from './ThemeSwitch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Usersetting = () => {
  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
    toast.success('Logged out successfully');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  }

  return (
    <>
      <div className='text-2xl'>
        <Title text1={'Change'} text2={'Settings'} />
      </div>
      <div>
        <div className='flex flex-col justify-start items-start gap-8 mt-4'>
          <div className='flex justify-center items-center gap-4'>
            <ThemeSwitch />
          </div>
          <div className='flex justify-center items-center gap-4'>
            <button
              onClick={() => navigate('/emailsupport')}
              className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
            >
              <span
                className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                ></span>
              </span>
              <span
                className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
              >
                <span
                  className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                ></span>
              </span>
              <span
                className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
              ></span>
              <span
                className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
              ><pre>  Help  </pre></span>
            </button>
          </div>
          <button
            onClick={logout}
            className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
            type="button"
          >
            <div
              className="bg-red-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
            >
              <svg width="30px" height="30px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.8160000000000001"></g><g id="SVGRepo_iconCarrier"> <path d="M18 8L22 12M22 12L18 16M22 12H9M15 4.20404C13.7252 3.43827 12.2452 3 10.6667 3C5.8802 3 2 7.02944 2 12C2 16.9706 5.8802 21 10.6667 21C12.2452 21 13.7252 20.5617 15 19.796" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
            <p className="translate-x-2">Log Out</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default Usersetting;