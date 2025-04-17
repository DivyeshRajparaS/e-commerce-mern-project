import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Herovideo1 = () => {
    const { navigate } = useContext(ShopContext);
    return (
        <div className='relative'>
            <div>
                <video loop autoPlay muted>
                    <source src={assets.finalhomevideo} />
                </video>
            </div>
            <div className='absolute bottom-5 right-3 xl:bottom-20 xl:right-10 md:bottom-10 md:right-5 flex gap-2 flex-col justify-start items-start text-white'>
                <p className='xl:text-[45px] md:text-[30px] font-bold'>Galaxy S25 Ultra</p>
                <p className='md:text-[15px] flex'>Offer: Get 512 GB at price of 256 GB (Save upto ₹5999)</p>
                <img className='md:h-auto md:w-[150px]' src="https://images.samsung.com/in/smartphones/galaxy-s25-ultra/images/galaxy-s25-ultra-features-kv-ai-text.png?imbypass=true" alt="" />
                <button  onClick={() => navigate("/product/67cd6b7c265058a933eeab57")} className='border border-white px-5 py-1 xl:px-10 xl:py-3 rounded-full'>BUY NOW</button>
            </div>
        </div>
    )
}

export default Herovideo1;