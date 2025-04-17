import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t dark:border-gray-500'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 dark:text-gray-300'>
          <p>At <b>Electronic Device</b>, we are committed to shaping the future of technology with innovative and high-quality electronic devices that enhance the lives of people around the world. Founded with a vision to deliver cutting-edge solutions, we design, manufacture, and distribute a wide range of advanced consumer electronics—from smartphones ,Leptop and smart appliances.</p>
          <p>With over a decade of experience in the industry, <b>Electronics Device</b> has become a trusted name for quality, reliability, and innovation. Our team of passionate engineers, designers, and technicians work tirelessly to develop products that push the boundaries of what technology can achieve, all while prioritizing user-friendly designs and seamless integration into everyday life.</p>
          <b className='text-gray-800 dark:text-gray-200'>Our Mission</b>
          <p>Our mission To empower individuals and businesses with state-of-the-art electronic solutions that enhance productivity, entertainment, and connectivity. We believe in the transformative power of technology, and our goal is to make it accessible, affordable, and effective for everyone.</p>
        </div>
      </div>

      <div className=' text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border dark:border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='dark:text-gray-200'>Quality Assurance:</b>
          <p className=' text-gray-600 dark:text-gray-400'>Each product undergoes rigorous testing to ensure it meets the highest standards of performance, durability, and design.</p>
        </div>
        <div className='border dark:border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='dark:text-gray-200'>Convenience:</b>
          <p className=' text-gray-600 dark:text-gray-400'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border dark:border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='dark:text-gray-200'>Customer Service:</b>
          <p className=' text-gray-600 dark:text-gray-400'>We prioritize customer satisfaction, offering 24/7 support and a commitment to providing you with the best service possible.</p>
        </div>
      </div>

      {/* <NewsletterBox /> */}
    </div>
  )
}

export default About;