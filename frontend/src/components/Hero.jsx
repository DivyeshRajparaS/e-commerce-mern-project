import React from 'react'
import { assets } from '../assets/assets'
import './hero.css'

const Hero = () => {
  return (
    <>
    
      <div className='flex h-96 flex-col sm:flex-row border border-gray-400 dark:border-gray-600'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-slate-400'></p>
              <p className=' font-medium text-sm md:text-base dark:text-slate-300'>OUR BESTSELLERS</p>
            </div>
            <div>
              <div className="card">
                <div className="loader">
                  <p className='prata-regular text-3xl sm:py-3 max-sm:text-[25px] lg:text-5xl leading-relaxed'>Explore</p>
                  <div className="words max-sm:h-[30px] sm:pt-1 max-sm:pb-1">
                    <span className="word max-sm:text-[25px]">Storages</span>
                    <span className="word max-sm:text-[25px]">Mobiles</span>
                    <span className="word max-sm:text-[25px]">Leptops</span>
                    <span className="word max-sm:text-[25px]">Accessories</span>
                    <span className="word max-sm:text-[25px]">cards</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-sm md:text-base dark:text-slate-400'>SHOP NOW</p>
              <p className='w-8 md:w-11 h-[1px] bg-[#414141] dark:bg-slate-400'></p>
            </div>
          </div>
        </div>
        {/* Hero Right Side */}
        {/* <video loop autoPlay muted>
          <source src={assets.finalhomevideo} />
        </video> */}
        <img className='sm:w-1/2' src={assets.hero} alt="" />
      </div>
    </>
  )
}

export default Hero
