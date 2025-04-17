import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (isPopupVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isPopupVisible]);

  const handleYesClick = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/calcelorder', { orderId }, { headers: { token }, withCredentials: true })

      if (response.data.success) {
        toast.success("The order calceled successfully")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
    console.log(orderId);
    resetPopup();
  };

  const handleNoClick = () => {
    resetPopup();
  };

  const handleButtonClick = () => {
    resetPopup(true);
  };

  const resetPopup = (show = false) => {
    setIsPopupVisible(false);
    setTimeout(() => {
      setIsPopupVisible(show);
    }, 50);
  };

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token }, withCredentials: true })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token }, withCredentials: true })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [orders])

  return (
    <>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} x<span> {item.size} </span> </p>
                    }
                    else {
                      return <p className='py-0.5' key={index}> {item.name} x {item.quantity} x<span> {item.size} </span> ,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <div className='flex flex-col justify-center items-center gap-4'>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button onClick={() => handleButtonClick(setOrderId(order._id))} className='w-[138px] h-[36px] bg-red-500 text-white cursor-pointer rounded'>Cancel order</button>
              </div>
              {isPopupVisible && (
                <>
                  <div className="fixed inset-0 z-40"></div>
                  <div className="fixed inset-0 flex items-start justify-center pt-10 z-50">
                    <div className="bg-white px-12 py-5 rounded-md shadow-lg border transform transition-all animate-slide-fade">
                      <p className="text-lg font-semibold mb-4 text-center">
                        Are you sure?
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button onClick={() => handleYesClick()} className="bg-green-500 text-white px-5 py-2 rounded-md transition-all hover:bg-green-600" >
                          Yes
                        </button>
                        <button onClick={handleNoClick} className="bg-red-500 text-white px-5 py-2 rounded-md transition-all hover:bg-red-600">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        }
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
    </>
  )
}

export default Orders