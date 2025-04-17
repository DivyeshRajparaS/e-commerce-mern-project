import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

      <div>
        <svg width="48px" height="48px" className='w-12 m-auto mb-5 dark:fill-white'
          viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"
          strokeWidth="0.00024000000000000003">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M5.373 4.51A9.962 9.962 0 0 1 12 2c5.523 0 10 4.477 10 10a9.954 9.954 0 0 1-1.793 5.715L17.5 12H20A8 8 0 0 0 6.274 6.413l-.9-1.902zm13.254 14.98A9.962 9.962 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.125.663-4.095 1.793-5.715L6.5 12H4a8 8 0 0 0 13.726 5.587l.9 1.902zm-5.213-4.662L10.586 12l-2.829 2.828-1.414-1.414 4.243-4.242L13.414 12l2.829-2.828 1.414 1.414-4.243 4.242z"></path>
            </g>
          </g>
        </svg>
        <p className='font-semibold dark:text-gray-500'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free  exchange policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold dark:text-gray-500'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
      </div>
      <div>
        <svg width="50px" height="50px" className='w-auto m-auto mb-5 dark:stroke-white' viewBox="0 0 24 24" role="img"
          xmlns="http://www.w3.org/2000/svg" aria-labelledby="supportIconTitle" stroke="#000000"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000000">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title id="supportIconTitle">Support</title>
            <path
              d="M18,9 L16,9 C14.8954305,9 14,9.8954305 14,11 L14,13 C14,14.1045695 14.8954305,15 16,15 L16,15 C17.1045695,15 18,14.1045695 18,13 L18,9 C18,4.02943725 13.9705627,0 9,0 C4.02943725,0 0,4.02943725 0,9 L0,13 C1.3527075e-16,14.1045695 0.8954305,15 2,15 L2,15 C3.1045695,15 4,14.1045695 4,13 L4,11 C4,9.8954305 3.1045695,9 2,9 L0,9"
              transform="translate(3 3)"></path>
            <path d="M21,14 L21,18 C21,20 20.3333333,21 19,21 C17.6666667,21 16,21 14,21"></path>
          </g>
        </svg>
        <p className='font-semibold dark:text-gray-500'>Best customer support</p>
        <p className='text-gray-400'>we provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy;