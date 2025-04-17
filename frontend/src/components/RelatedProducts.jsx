import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {

  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {

    if (products.length > 0) {

      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 5));
    }

  }, [products])

  return (
    <>
      {
        products ?
          <div className='my-24'>
            < div className=' text-center text-3xl py-2' >
              <Title text1={'RELATED'} text2={"PRODUCTS"} />
            </div >

            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
              {related.map((item, index) => (
                <div key={index}>
                  <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                  <div className='md:hidden max-sm:h-[2px] max-sm:w-full max-sm:bg-gray-400'></div>
                </div>
              ))}
            </div>
          </div > : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 animate-pulse">
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
      }
    </>
  )
}

export default RelatedProducts
