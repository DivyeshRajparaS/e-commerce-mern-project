import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="" />
          <p className='w-full md:w-2/3 text-gray-600 dark:text-slate-400'>
            As we look to the future, we remain focused on our goal of creating products that make the world more connected, intelligent, and efficient. We envision a world where our technology not only empowers users but also contributes to global sustainability and positive societal impact.
          </p>
          <br />
          <p className='w-full md:w-2/3 text-gray-600 dark:text-slate-400'>Join us on our journey to a smarter, more connected world. <b> Electronic Device – Where innovation meets possibility.</b></p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 dark:text-slate-300'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600 dark:text-slate-300'>
            <li className='dark:text-slate-400'>Home</li>
            <li className='dark:text-slate-400'>About us</li>
            <li className='dark:text-slate-400'>Delivery</li>
            <li className='dark:text-slate-400'>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 dark:text-slate-300'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className='dark:text-slate-400'>+91 76768 12128</li>
            <li className='dark:text-slate-400'>4ddrr4444@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <div className='w-full h-[1px] bg-[#dadde3] dark:bg-gray-500'></div>
        <p className='py-5 text-sm text-center dark:text-slate-200'>Copyright 2025@ electronicdevice.netlify.app - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
