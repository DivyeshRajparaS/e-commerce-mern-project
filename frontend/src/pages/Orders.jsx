import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { assets } from '../assets/assets';

const Userorders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);
  const [loader, setLoader] = useState(false);

  const loadOrderData = async () => {
    setLoader(true);
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { withCredentials: true });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['payment'] = order.payment.toString().charAt(0).toUpperCase() + order.payment.toString().slice(1);
            allOrdersItem.push(item);
          })
        })
        setorderData(allOrdersItem.reverse());
        setLoader(false);
      }
    } catch (error) {
    }
  }

  function LoadingContainer() {
    return <>
      <div className='flex flex-col'>
        <div className='py-4 border-t dark:border-t-gray-500 border-b dark:border-b-gray-500 flex md:flex-row md:items-center md:justify-between gap-4 animate-pulse'>
          <div className='flex items-start gap-6 text-sm max-[432px]:flex-col'>
            <div className='w-16 sm:w-20 h-16 sm:h-20 bg-gray-300 dark:bg-gray-700 rounded'></div>
            <div className='flex flex-col gap-1'>
              <div className='h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded'></div>
              <div className='mt-2 h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded'></div>
              <div className='mt-2 h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded'></div>
              <div className='mt-2 h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded'></div>
              <div className='mt-2 h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded'></div>
              <div className='mt-2 h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded'></div>
            </div>
          </div>
          <div className='md:w-1/2 flex justify-around items-center'>
            <div className='flex items-center justify-center gap-2 max-sm:flex-col'>
              <div className='w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded'></div>
              <div className='h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded'></div>
            </div>
            <div className='w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded'></div>
          </div>
        </div>
      </div>
    </>
  }

  useEffect(() => {
    if (token) loadOrderData();
  }, [token])

  return (
    <>
      <div className=''>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>

        {
          loader ?
            <>
              <LoadingContainer />
              <LoadingContainer />
              <LoadingContainer />
              <LoadingContainer />
            </>
            :
            <div>
              {
                orderData.map((item, index) => (
                  <div key={index} className='py-4 border-t dark:border-t-gray-500 border-b dark:border-b-gray-500 text-gray-700 flex md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm max-[432px]:flex-col'>
                      <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                      <div>
                        <p className='sm:text-base font-medium dark:text-gray-300'>{item.name}</p>
                        <div className=' items-center gap-3 mt-1 text-base text-gray-700 dark:text-gray-300'>
                          <p className='dark:text-gray-300'>{currency}{item.price}</p>
                          <p className='dark:text-gray-300'>Quantity: {item.quantity}</p>
                          <p className='dark:text-gray-300'>Size: {item.size}</p>
                        </div>
                        <p className='mt-1 dark:text-gray-300'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                        <p className='mt-1 dark:text-gray-300'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        <p className='mt-1 dark:text-gray-300'>Payment Status: <span className=' text-gray-400'>{item.payment}</span></p>
                      </div>
                    </div>
                    <div className='md:w-1/2 flex justify-around items-center'>
                      <div className='flex items-center justify-center gap-2 max-sm:flex-col'>
                        <video className='min-w-12 h-12' loop autoPlay muted src={assets.tracking}></video>
                        <p className='text-sm md:text-base dark:text-gray-300'>{item.status}</p>
                      </div>
                      <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm dark:bg-slate-800 dark:text-gray-300'>Track Order</button>
                    </div>
                  </div>
                ))
              }
            </div>
        }
      </div>
      {
        !loader && orderData.length === 0 && (
          <p className="text-center text-gray-500 text-xl mt-4">No orders found.</p>
        )
      }
    </>
  )
}

export default Userorders;
