import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({ name: '', category: 'Mobile', price: '' });
  const [loader, setLoader] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', { withCredentials: true });
      if (response.data.success) {
        setList(response.data.products.reverse());
        setLoader(false);
      } else {
        toast.error(response.data.message);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token }, withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item._id);
    setUpdatedItem({ name: item.name, category: item.category, price: item.price });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/updateProductDetails', { id, ...updatedItem }, { headers: { token }, withCredentials: true });
      if (response.data.success) {
        toast.success('Product updated successfully');
        setEditItemId(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditItemId(null);
  };

  const SkeletonLoader = () => {
    return (
      <div className="w-full max-w-20xl mx-auto">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-200 animate-pulse rounded-lg mb-3">
            <div className="w-12 h-12 bg-gray-300 rounded-md"></div>

            <div className="ml-4 flex-1">
              <div className="w-60 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-36 h-4 bg-gray-300 rounded"></div>
            </div>

            <div className="w-28 h-4 bg-gray-300 rounded mr-4"></div>

            <div className="w-20 h-6 bg-gray-300 rounded mr-2"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden h-10 md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border-solid border-2 border-gray-400 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {
          loader ? <SkeletonLoader /> :
            <>
              {list.map((item) => (
                <div key={item._id} className='border-solid border-2 border-gray-300 text-sm p-2'>
                  <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2'>
                    <img className='w-12' src={item.image[0]} alt='' />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{currency}{item.price}</p>
                    <button onClick={() => handleEdit(item)} className='text-blue-500'>Update</button>
                    <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-500'>X</p>
                  </div>
                  {editItemId === item._id && (
                    <div className='mt-2 border p-2 bg-gray-100'>
                      <input
                        type='text'
                        value={updatedItem.name}
                        onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
                        className='border border-gray-400 p-1 w-full mb-2'
                        placeholder='Product Name'
                      />
                      <select
                        value={updatedItem.category}
                        onChange={(e) => setUpdatedItem({ ...updatedItem, category: e.target.value })}
                        className='border border-gray-400 p-1 w-full mb-2'
                      >
                        <option value='Mobile'>Mobile</option>
                        <option value='Leptop'>Leptop</option>
                        <option value='Accessories'>Accessories</option>
                      </select>
                      <input
                        type='number'
                        value={updatedItem.price}
                        onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
                        className='border border-gray-400 p-1 w-full mb-2'
                        placeholder='Product Price'
                      />
                      <div className='flex gap-2'>
                        <button onClick={() => handleUpdate(item._id)} className='bg-blue-500 text-white px-3 py-1 rounded'>Submit</button>
                        <button onClick={handleCancel} className='bg-gray-500 text-white px-3 py-1 rounded'>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
        }
      </div>
    </>
  );
};

export default List;