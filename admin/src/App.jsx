import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './pages/User'
import Dashboard from './pages/Dashboard'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-100 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-full flex flex-col'>
              <Navbar setToken={setToken} />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/dashboard' element={<Dashboard token={token} />} />
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  <Route path='/user' element={<User token={token} />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App