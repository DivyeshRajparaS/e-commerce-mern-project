import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Userinfo = () => {
  const { backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phn, setPhn] = useState('');

  useEffect(() => {
    const getuserdata = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(backendUrl + '/api/user/showdata', {}, { withCredentials: true });

        const { name, email, phonenumber } = await response.data.data;
        setName(name);
        setEmail(email);
        setPhn(phonenumber);
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    getuserdata();
  }, []);

  return (
    <div>
      <div className='text-2xl'>
        <Title text1={'Your'} text2={'Profile'} />
      </div>

      <div>
        <div className='flex flex-col justify-start items-start gap-4 mt-4'>
          <div className='flex justify-center items-center gap-4'>
            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>   {/* Green dot */}
            <label className='w-44 text-xl max-[400px]:w-auto dark:text-gray-300'><b>Username </b></label>
            <p className='text-xl dark:text-gray-300'>: {name || "N/A"}</p>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>   {/* Green dot */}
            <label className='w-44 text-xl max-[500px]:w-auto dark:text-gray-300'><b>Email </b></label>
            <p className='text-xl dark:text-gray-300'>: {email || "N/A"}</p>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>   {/* Green dot */}
            <label className='w-44 text-xl max-[500px]:w-auto dark:text-gray-300'><b>Phone Number </b></label>
            <p className='text-xl dark:text-gray-300'>: {phn || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;