import React from 'react'
import { assets } from '../assets/assets'
import Chart from "react-apexcharts";
import { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
export const backendUrl = import.meta.env.VITE_BACKEND_URL

const Dashboard = ({ token }) => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(3);
  const [ordernumber, setOrderNumber] = useState(0);
  const [productnumber, setProductNumber] = useState(0);
  const [categorynumber, setCategoryNumber] = useState(0);
  const [usernumber, setUserNumber] = useState(0);

  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [orderMonths, setOrderMonths] = useState([]);

  useEffect(() => {
    const UserCount = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product/usercount', { headers: { token }, withCredentials: true })
        if (response.data.success) {
          setUserCount(response.data.count)
        }
        else {
          console.log(response.data.message)
        }
      } catch (error) {
        console.log('error:' + error)
      }
    }

    const ProductCount = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product/productcount', { headers: { token }, withCredentials: true })
        if (response.data.success) {
          setProductCount(response.data.count)
        }
        else {
          console.log(response.data.message)
        }
      } catch (error) {
        console.log('error:' + error)
      }
    }

    const OrderCount = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product/ordercount', { headers: { token }, withCredentials: true })
        if (response.data.success) {
          setOrderCount(response.data.count)
        }
        else {
          console.log(response.data.message)
        }
      } catch (error) {
        console.log('error:' + error)
      }
    }

    const fetchAllOrders = async () => {
      if (!token) {
        return null;
      }

      try {
        const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token }, withCredentials: true })
        if (response.data.success) {
          // setOrders(response.data.orders)
          const orders = response.data.orders;
          // console.log(response.data.orders[0].date);
          const monthCounts = {};

          orders.forEach(order => {
            const date = new Date(order.date); // Assuming `order.date` is a timestamp
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format as "Month-Year"

            // Count orders per month
            if (monthCounts[monthYear]) {
              monthCounts[monthYear]++;
            } else {
              monthCounts[monthYear] = 1;
            }

            const months = Object.keys(monthCounts);
            const counts = Object.values(monthCounts);

            setOrderMonths(months);
            setMonthlyOrders(counts);
          });

        } else {
          toast.error(response.data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }
    }

    UserCount();
    ProductCount();
    OrderCount();
    fetchAllOrders();
  }, []);

  useEffect(() => {
    let currentNumber = 0;
    const increment = orderCount / 100; // Adjust for smoother animation
    const interval = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= orderCount) {
        clearInterval(interval);
        setOrderNumber(orderCount);
      } else {
        setOrderNumber(Math.floor(currentNumber));
      }
    }, 2); // Speed of update in milliseconds

    return () => clearInterval(interval);
  }, [orderCount]);

  useEffect(() => {
    let currentNumber = 0;
    const increment = productCount / 100; // Adjust for smoother animation
    const interval = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= productCount) {
        clearInterval(interval);
        setProductNumber(productCount);
      } else {
        setProductNumber(Math.floor(currentNumber));
      }
    }, 1); // Speed of update in milliseconds

    return () => clearInterval(interval);
  }, [productCount]);

  useEffect(() => {
    let currentNumber = 0;
    const increment = categoryCount / 100; // Adjust for smoother animation
    const interval = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= categoryCount) {
        clearInterval(interval);
        setCategoryNumber(categoryCount);
      } else {
        setCategoryNumber(Math.floor(currentNumber));
      }
    }, 1); // Speed of update in milliseconds

    return () => clearInterval(interval);
  }, [categoryCount]);

  useEffect(() => {
    let currentNumber = 0;
    const increment = userCount / 100; // Adjust for smoother animation
    const interval = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= userCount) {
        clearInterval(interval);
        setUserNumber(userCount);
      } else {
        setUserNumber(Math.floor(currentNumber));
      }
    }, 1); // Speed of update in milliseconds

    return () => clearInterval(interval);
  }, [userCount]);

  useEffect(() => {
    function getRandomDecemberTimestamp(year) {
      const start = new Date(year, 2, 1); // December 1st
      const end = new Date(year, 2, 31); // December 31st

      const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());

      return Math.floor(randomTimestamp);
    }

    // Example usage
    const randomTimestamp = getRandomDecemberTimestamp(2025);
    // console.log(randomTimestamp);

    const date = new Date(randomTimestamp);

    // console.log(date.toString());
  }, [])

  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        categories: ['january', 'February', 'March', 'April', 'May', 'June']
      }
    },
    series: [
      {

        name: "series-1",
        // data: [30, 40, 45, 50, 49, 60, 70, 91]
        data: []
      }
    ]
  })

  useEffect(() => {
    setState(prevState => ({
      // ...prevState,
      // options: {
      //   ...prevState.options,
      //   xaxis: {
      //     ...prevState.options.xaxis,
      //     categories: orderMonths // Update categories with the fetched months
      //   }
      // },
      series: [
        {
          name: "series-1",
          data: monthlyOrders // Update series data with the fetched order counts
        }
      ]
    }));
  }, [orderMonths, monthlyOrders]);

  const [circlestate, setCirclestate] = React.useState({
    series: [productCount, 2, 3, 3],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Orders', 'Products', 'Category', 'Users'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  useEffect(() => {
    setCirclestate((prevState) => ({
      ...prevState,
      series: [orderCount, productCount, 3, userCount],
    }));
  }, [productCount, orderCount, userCount]);

  return (
    <>
      <div>Dashboard</div>
      <div className='flex justify-start items-center mt-6 gap-6'>

        <div className='bg-blue-500 rounded-[4px]'>
          <div className='flex  h-[100px] w-[220px] text-white font-bold'>
            <p className='pl-[18px] pt-[35px] text-lg'>ORDERS</p>
            <div className='pl-[50px] pt-[28px]'>
              <img className='h-12 w-12 ' src={assets.additem_icon} alt="" />
            </div>
          </div>
          <div className='flex mb-[45px]'>
            <h1 className='flex justify-start pl-[22px]  text-white font-bold text-4xl '>{ordernumber}</h1>
          </div>
        </div>

        <div className='bg-orange-500 rounded-[4px]'>
          <div className='flex  h-[100px] w-[220px] text-white font-bold'>
            <p className='pl-[18px] pt-[35px] text-lg'>CATEGORY</p>
            <div className='pl-[50px] pt-[28px]'>
              <img className='h-12 w-12 ' src={assets.additem_icon} alt="" />
            </div>
          </div>
          <div className='flex mb-[45px]'>
            <h1 className='flex justify-start pl-[22px]  text-white font-bold text-4xl '>{categorynumber}</h1>
          </div>
        </div>

        <div className='bg-green-600 rounded-[4px]'>
          <div className='flex  h-[100px] w-[220px] text-white font-bold'>
            <p className='pl-[18px] pt-[35px] text-lg'>PRODUCTS</p>
            <div className='pl-[50px] pt-[28px]'>
              <img className='h-12 w-12 ' src={assets.additem_icon} alt="" />
            </div>
          </div>
          <div className='flex mb-[45px]'>
            <h1 className='flex justify-start pl-[22px]  text-white font-bold text-4xl '>{productnumber}</h1>
          </div>
        </div>

        <div className='bg-red-600 rounded-[4px]'>
          <div className='flex  h-[100px] w-[220px] text-white font-bold'>
            <p className='pl-[18px] pt-[35px] text-lg'>USERS</p>
            <div className='pl-[50px] pt-[28px]'>
              <img className='h-12 w-12 ' src={assets.additem_icon} alt="" />
            </div>
          </div>
          <div className='flex mb-[45px]'>
            <h1 className='flex justify-start pl-[22px]  text-white font-bold text-4xl '>{usernumber}</h1>
          </div>
        </div>
      </div>

      {/* charts */}

      <div className=' flex justify-start items-center mt-6 gap-6'>
        <div className='pt-16'>
          <Chart
            options={state.options}
            series={state.series}

            type="bar"
            width="500"
          />
          <h1 className='text-lg font-bold'>Total Sell products-2025</h1>
        </div>
        <div className='pt-16'>
          <Chart
            options={circlestate.options}
            series={circlestate.series}

            type="donut"
            width="500"
          />
          <h1 className='text-lg font-bold'>Dashboard Analytics</h1>
        </div>
      </div>
    </>
  )
}

export default Dashboard