import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Userorders = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [orders, setOrders] = useState([])
    const [loader, setLoader] = useState(true);
    const currency = '₹';

    const fetchAllOrders = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/user/orders', {}, { withCredentials: true });
            if (response.data.success) {
                setOrders(response.data.orders.reverse());
                setLoader(false);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const cancelOrder = async (orderId) => {
        const response = await axios.post(backendUrl + '/api/user/cancelOrder', { orderId }, { withCredentials: true });
        if (response.data.success) {
            toast.success("Order canceled successfully");
            fetchAllOrders();
        } else {
            toast.error(response.data.message);
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])


    const loadOrderData = async () => {
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { withCredentials: true })
            if (response.data.success) {
                let allOrdersItem = []
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setorderData(allOrdersItem.reverse())
            }

        } catch (error) {

        }
    }

    const SkeletonLoader = () => {
        return (
            <>
                <div className='text-2xl mb-4'>
                    <div className='h-8 w-32 bg-gray-300 animate-pulse rounded'></div>
                </div>
                <div>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                            <div className='flex gap-2'>
                                {[...Array(2)].map((_, idx) => (
                                    <div key={idx} className='w-12 h-12 bg-gray-300 animate-pulse rounded'></div>
                                ))}
                            </div>
                            <div>
                                <div>
                                    {[...Array(2)].map((_, idx) => (
                                        <div key={idx} className='h-4 w-3/4 bg-gray-300 animate-pulse rounded my-1'></div>
                                    ))}
                                </div>
                                <div className='h-5 w-1/2 bg-gray-300 animate-pulse rounded mt-3 mb-2'></div>
                                <div className='h-5 w-20 bg-gray-300 animate-pulse rounded my-4'></div>
                                <div className='h-4 w-3/4 bg-gray-300 animate-pulse rounded'></div>
                                <div className='h-4 w-2/3 bg-gray-300 animate-pulse rounded'></div>
                                <div className='h-4 w-1/2 bg-gray-300 animate-pulse rounded'></div>
                                <div className='h-4 w-1/4 bg-gray-300 animate-pulse rounded mt-3'></div>
                                <div className='h-4 w-1/3 bg-gray-300 animate-pulse rounded'></div>
                                <div className='h-4 w-1/4 bg-gray-300 animate-pulse rounded'></div>
                            </div>
                            <div className='w-full h-full flex gap-3 items-center justify-center'>
                                <div className='w-12 h-12 bg-gray-300 animate-pulse rounded'></div>
                                <div className='h-6 w-20 bg-gray-300 animate-pulse rounded'></div>
                            </div>
                            <div></div>
                            <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
                                <div className='h-9 w-32 bg-gray-300 animate-pulse rounded'></div>
                                <div className='h-9 w-32 bg-gray-300 animate-pulse rounded'></div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    useEffect(() => {
        loadOrderData()
    }, [token])

    return (
        <>
            {
                loader ? <SkeletonLoader />
                    :
                    <>
                        <div className='text-2xl'>
                            <Title text1={'MY'} text2={'ORDERS'} />
                        </div>
                        <div>
                            {
                                orders.map((order, index) => (
                                    <div className='grid dark:text-white grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                                        <div>
                                            {
                                                order.items.map((item, index) => (
                                                    <img key={index} src={item.image[0]} alt="" />
                                                ))
                                            }
                                        </div>
                                        <div>
                                            <div>
                                                {order.items.map((item, index) => {
                                                    if (index === order.items.length - 1) {
                                                        return <p className='py-0.5' key={index}> {item.name} x {item.quantity} x<span> {item.size} x</span> <span>{currency}{item.price}</span> </p>
                                                    } else {
                                                        return <p className='py-0.5' key={index}> {item.name} x {item.quantity} x<span> {item.size} x</span><span> {currency}{item.price}</span> ,</p>
                                                    }
                                                })}
                                            </div>
                                            <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                                            <div className='my-4'>
                                                <p className='text-sm sm:text-[15px] font-bold'>{currency}{order.amount}</p>
                                            </div>
                                            <div>
                                                <p>{order.address.street + ","}</p>
                                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                            </div>
                                            <p>{order.address.phone}</p>
                                            <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                                            <p className='mt-3'>Method : {order.paymentMethod}</p>
                                            <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                                            <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className='w-full h-full flex gap-3 items-center justify-center'>
                                            <video className='min-w-12 h-12' loop autoPlay muted src={assets.tracking}></video>
                                            <p className='text-xl'>{order.status}</p>
                                        </div>
                                        <div></div>
                                        <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
                                            {
                                                order.status === "Delivered"
                                                    ?
                                                    <p className='text-lg'>Your order is delivered</p>
                                                    :
                                                    <>
                                                        <button onClick={fetchAllOrders} className='border px-4 py-2 text-sm font-medium rounded-sm dark:bg-slate-800 dark:text-gray-300'>Track Order</button>
                                                        <button onClick={() => order.status === "Out for delivery" ? toast.error("Your order is Out for delivery, so you cannot cancel order") : cancelOrder(order._id)} className='w-[138px] h-[36px] bg-red-500 text-white cursor-pointer rounded'>Cancel order</button>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Userorders;
