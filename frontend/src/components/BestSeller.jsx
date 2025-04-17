import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  return (
    <>
      {
        products.length === 0 ?
          <div className="my-10 animate-pulse">
            <div className='text-center py-8'>
              <div className='h-10 bg-gray-200 rounded w-1/4 m-auto'></div>
              <p className='w-3/4 m-auto h-4 bg-gray-200 rounded mt-3'></p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 animate-pulse">
            <div>
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-6 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-6 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-6 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-6 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
          </div>
          :
          <div className='my-10'>
            <div className='text-center text-3xl py-8'>
              <Title text1={'BEST'} text2={'SELLERS'} />
              <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 dark:text-slate-300'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
              </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
              {
                bestSeller.map((item, index) => (
                  <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
              }
            </div>
          </div>
      }
    </>
  )
}

export default BestSeller;