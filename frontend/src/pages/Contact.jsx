import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t dark:border-gray-500'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'><u className='dark:text-gray-200'>Our Store</u></p>
          <p className=' text-gray-500 dark:text-gray-200'>A - 05 business hub, <br /> IT Park, Mota Varachha, surat</p>
          <p className=' text-gray-900 dark:text-gray-300'><b>Tel:</b> +91 76768 12128<br /> <b>Email:</b> 4ddrr4444@gmail.com</p>
          <p className='text-gray-900 dark:text-gray-300'><b>Headquarters :</b> Surat<br /><b>Founded :</b> 1 Janury 2025</p>
          <pre className=' text-gray-900 dark:text-gray-300'><b>Company CEO :</b> Rajodiya Deep<br/>              Rajpara Divyesh<br/>              Sabhadiya Ruchit</pre>
          <p className='font-semibold text-xl text-gray-600 dark:text-gray-400'><u>Careers at Forever</u></p>
          <p className=' text-gray-500 dark:text-gray-300'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 dark:bg-slate-700 dark:text-white text-sm hover:bg-black hover:text-white transition-all duration-500'>Intrested to Job</button>
        </div>
      </div>

      {/* <NewsletterBox/> */}
    </div>
  )
}

export default Contact