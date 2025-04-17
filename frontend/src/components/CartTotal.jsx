import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CartTotal = () => {
  let location = useLocation();
  const [coupon, setCoupon] = useState('');
  const [addcoupon, setAddcoupon] = useState(false);
  const [lastPrice, setLastprice] = useState(0);
  const { currency, delivery_fee, getCartAmount, couponcode, token, backendUrl, setCouponadded } = useContext(ShopContext);
  const [cartAmount, setCartAmount] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    setCartAmount(getCartAmount(addcoupon));
  }, [addcoupon, getCartAmount]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (coupon.trim() === couponcode) {
      try {
        const response = await axios.post(`${backendUrl}/api/user/cart/couponcode`, {}, { withCredentials: true });
        console.log(response);

        if (response.data.success) {
          toast.success("Coupon code added!");
          setAddcoupon(true);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error applying coupon");
      }
    } else {
      toast.error("Invalid coupon code");
    }
  };

  useEffect(() => {
    const getuserdata = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/user/showdata`, {}, { withCredentials: true });
        if (response.data.success) {
          const userData = response.data.data;
          setAddcoupon(userData.usecoupon);
          setCouponadded(userData.usecoupon);
          setData(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getuserdata();
  }, []);

  useEffect(() => {
    let finalAmount = cartAmount + delivery_fee;

    if (addcoupon) {
      if (data?.couponAlreadyAdded) {
        setAddcoupon(false);
        setCouponadded(false);
        setLastprice(finalAmount);
      } else {
        setAddcoupon(true);
        setCouponadded(true);
        setLastprice(finalAmount - (cartAmount * 0.10));
      }
    } else {
      setLastprice(finalAmount);
    }
  }, [addcoupon, cartAmount, delivery_fee]);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p className='dark:text-slate-300'>Subtotal</p>
          {
            addcoupon ? (
              <div className='flex gap-2'>
                <p className='dark:text-slate-300 line-through'>{currency} {(cartAmount + (cartAmount * 0.10)).toFixed(2)}</p>
                <p className='dark:text-slate-300'>{currency} {(cartAmount).toFixed(2)}</p>
              </div>
            ) : (
              <p className='dark:text-slate-300'>{currency} {cartAmount.toFixed(2)}</p>
            )
          }
        </div>
        <div className='w-full h-[1px] bg-[#dadde3] dark:bg-gray-500'></div>
        <div className='flex justify-between'>
          <p className='dark:text-slate-300'>Shipping Fee</p>
          <p className='dark:text-slate-300'>{currency} {delivery_fee.toFixed(2)}</p>
        </div>
        <div className='w-full h-[1px] bg-[#dadde3] dark:bg-gray-500'></div>
        {
          location.pathname === '/place-order' ? null : (
            <form onSubmit={onSubmitHandler} className='flex justify-center gap-2 items-center'>
              <input type="text" className='w-full px-3 py-2 border border-gray-800' value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder='Enter coupon code to get extra 10% off' />
              <button type="submit" className='bg-black text-slate-300 font-light px-8 py-2'>Add</button>
            </form>
          )
        }
        <div className='flex justify-between'>
          <b className='dark:text-slate-300'>Total</b>
          {
            addcoupon ? (
              <div className='flex gap-2'>
                <b className='dark:text-slate-300 line-through'>{currency} {(cartAmount + (cartAmount * 0.10)).toFixed(2)}</b>
                <b className='dark:text-slate-300'>{currency} {cartAmount.toFixed(2)}</b>
              </div>
            ) : (
              <b className='dark:text-slate-300'>{currency} {lastPrice.toFixed(2)}</b>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
