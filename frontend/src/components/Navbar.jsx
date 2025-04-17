import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import ThemeSwitch from './ThemeSwitch';
import axios from "axios";

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [dropdownVisible, setdropdownVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, backendUrl } = useContext(ShopContext);

    const logout = async () => {
        localStorage.removeItem('token');
        await axios.post(backendUrl + "/api/user/logout", {}, { withCredentials: true })
        setToken('');
        setCartItems({});
        navigate('/login');
    }

    return (
        <div className='flex items-center justify-between py-6 pb-8 font-medium dark:bg-slate-900'>
            <Link to='/'><img src={assets.logo} className='w-30 h-10 min-w-32 max-sm:w-2 max-sm:h-2 min-h-5' alt="" /></Link>

            <ul className='hidden lg:flex gap-5 text-sm text-gray-700 dark:text-white'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p className='text-lg dark:text-slate-200'>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-white' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p className='text-lg dark:text-slate-200'>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-white' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p className='text-lg dark:text-slate-200'>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-white' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p className='text-lg dark:text-slate-200'>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-white' />
                </NavLink>
                <a href="http://localhost:5174/dashboard" target="_blank" rel="noopener noreferrer">Admin</a>

                {/* when deploy website in netlify to set link in admin panel */}
                {/* <a href="https://adminelectronicedevice.netlify.app" target="_blank" rel="noopener noreferrer">Admin</a>  */}
            </ul>

            <div className='flex items-center gap-3'>
                <div className='hidden lg:flex justify-center items-center'>
                    <ThemeSwitch />
                </div>
                <svg onClick={() => { setShowSearch(true); navigate('/collection') }} width="28px" height="28px" className='w-6 h-6 min-w-8 cursor-pointer' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#484848">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>search</title>
                        <desc>Created with Sketch Beta.</desc>
                        <defs> </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"
                            sketch:type="MSPage">
                            <g id="Icon-Set" sketch:type="MSLayerGroup"
                                transform="translate(-256.000000, -1139.000000)" fill="#484848">
                                <path className='dark:fill-white'
                                    d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                                    id="search" sketch:type="MSShapeGroup"> </path>
                            </g>
                        </g>
                    </g>
                </svg>

                <div className='group relative'>
                    <svg onClick={() => token ? null : navigate('/login')} className='w-8 h-8 min-w-8 cursor-pointer' width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        stroke="#484848">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <circle cx="12" cy="6" r="4" stroke="#484848" className='dark:stroke-white' strokeWidth="1.5"></circle>
                            <path className='dark:stroke-white'
                                d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634"
                                stroke="#484848" strokeWidth="1.5" strokeLinecap="round">
                            </path>
                        </g>
                    </svg>
                    {/* Dropdown Menu */}
                    {token &&
                        <div className='group-hover:block z-10 hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-48 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
                                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                                {/* <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p> */}
                                <p onClick={() => navigate('/anotherOrders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={() => navigate('/emailsupport')} className='cursor-pointer hover:text-black'>Customer Support</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <svg width="30px" height="30px" className='w-9 h-9 min-w-10' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path className='dark:stroke-white'
                                d="M8 11.01V11M16 11.01V11M8 8V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V8M8 8H6.84027C5.80009 8 4.93356 8.79732 4.84718 9.83391L4.18051 17.8339C4.08334 18.9999 5.00352 20 6.1736 20H17.8264C18.9965 20 19.9167 18.9999 19.8195 17.8339L19.1528 9.83391C19.0664 8.79732 18.1999 8 17.1597 8H16M8 8H16"
                                stroke="#484848" strokeWidth="0.9600000000000002" strokeLinecap="round"
                                strokeLinejoin="round">
                            </path>
                        </g>
                    </svg>
                    <p className='absolute right-[-0px] bottom-[-0px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {/* <p className='absolute inline-flex h-full w-full right-0 animate-ping rounded-full bg-black opacity-75'></p> */}
                        {getCartCount()}
                    </p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer lg:hidden' alt="" />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`absolute z-10 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer border-b'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b' to='/contact'>CONTACT</NavLink>
                    <a href="http://localhost:5174/dashboard" className='py-2 pl-6 border-b' target="_blank" rel="noopener noreferrer">Admin</a>
                    <div className='py-2 pl-6 border-b'>
                        <ThemeSwitch />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar;