import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link onClick={() => scrollTo(0, 0)} className='text-gray-700 rounded-sm cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pl-2 pb-1 text-sm dark:text-white'>{name}</p>
      <p className=' text-sm pl-2 font-medium dark:text-white'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem;