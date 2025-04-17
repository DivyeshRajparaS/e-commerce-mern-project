import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen bg-slate-800 text-white border-r-2 sticky left-0 top-0'>
            <div className='flex flex-col gap-4 text-[15px]'>
                <div className='flex items-center gap-3 px-3 py-2 rounded-l'>
                    <img src={assets.logo} alt="" />
                </div>
                <NavLink className='flex items-center gap-3 px-3 py-2 rounded-l' to="/dashboard">
                    <img className='w-8 h-8' src={assets.dashboard_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 px-3 py-2 rounded-l' to="/add">
                    <img className='w-8 h-8' src={assets.additem_icon} alt="" />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 px-3 py-2 rounded-l' to="/list">
                    <img className='w-8 h-8' src={assets.tracking_icon} alt="" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 px-3 py-2 rounded-l' to="/orders">
                    <img className='w-8 h-8' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

                <NavLink className='flex items-center gap-3 px-3 py-2 rounded-l' to="/user">
                    <img className='w-8 h-8' src={assets.userdata_icon} alt="" />
                    <p className='hidden md:block'>User Data</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
