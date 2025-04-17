
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Emailsupport = () => {

    const form = useRef();
    const [load, setLoad] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        setLoad(true);
        emailjs
            .sendForm('service_ifmb7ow', 'template_j6mnhj9', form.current, {
                publicKey: 'aABB3qZo30YbkR4FH',
            })
            .then(
                () => {
                    toast.success("Email send successfully")
                    e.target.reset();
                    setLoad(false);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    toast.error('Email send failed');
                    setLoad(false);
                },
            );
    };

    return (
        <>
            <div className='flex justify-center items-center gap-24'>
                <form ref={form} onSubmit={sendEmail} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
                    <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                        <div className='text-xl sm:text-2xl my-3'>
                            <Title text1={'CUSTOMER'} text2={'SUPPORT'} />
                        </div>
                        <div className='flex gap-3'>
                            <input required name="to_first_name" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                            <input required name='to_last_name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                        </div>
                        <input required name="from_email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                        <select name="from_issue" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' defaultValue='first' required>
                            <option value="first" disabled>Select Issue</option>
                            <option value="payment-issue">Payment Issue</option>
                            <option value="order-issue">Order Iuuse</option>
                            <option value="user-account-issue">User Account Issue</option>
                            <option value="other">Other</option>
                        </select>
                        <div className='flex gap-5'>
                            <input id="picture" size='50kb' type="file" name="from_image" accept='image/*' className="flex h-10 w-64 cursor-pointer rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" />
                            <p className='text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>*Maximum file size 50KB</p>
                        </div>
                        <textarea placeholder="Message" name="message" className='border border-gray-300 rounded py-1.5 px-3.5 w-full'></textarea>
                        <button type='submit' disabled={load} value="Send" className='bg-black dark:bg-slate-400 dark:text-black text-white rounded flex justify-center items-center px-16 py-3 text-sm'>{load ?
                            <div className="flex items-center flex-row gap-2">
                                <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                                <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                                <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                                <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                            </div> : 'REQUEST SEND'}</button>
                    </div>
                </form>

                <div className='hidden sm:flex justify-center items-center'>
                    <img className='w-[500px] h-[500px]' src={assets.support} alt="" />
                </div>
            </div>
        </>
    )
}

export default Emailsupport