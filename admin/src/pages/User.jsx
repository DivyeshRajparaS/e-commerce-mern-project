import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const User = ({ token }) => {
    const [data, setData] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        phonenumber: '',
    });

    const userdata = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/alluserdata', { headers: { token }, withCredentials: true });
            if (response.data.success) {
                setData(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleEditClick = (item) => {
        setEditUserId(item._id);
        setEditFormData({
            name: item.name,
            email: item.email,
            phonenumber: item.phonenumber,
        });
    };

    const handleCancelClick = () => {
        setEditUserId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleUpdateSubmit = async (userId) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/changeuserdetails', { userId, ...editFormData }, { headers: { token }, withCredentials: true });
            if (response.data.success) {
                toast.success('User updated successfully');
                userdata();
                setEditUserId(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/deleteuser', { userId }, { headers: { token }, withCredentials: true });
            if (response.data.success) {
                toast.success('User deleted successfully');
                userdata();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        userdata();
    }, []);

    return (
        <>
            <div className='flex flex-col gap-3'>

                {/* <div className="hidden md:grid w-auto grid-cols-6 items-center py-2 px-4 border border-gray-400 bg-gray-100 text-sm font-semibold"> */}
                <div className="hidden md:grid w-auto grid-cols-5 items-center py-2 px-4 border border-gray-400 bg-gray-100 text-sm font-semibold">
                    {/* <span>Number</span> */}
                    <span>Username</span>
                    <span>Email</span>
                    <span>Phone Number</span>
                    <span></span>
                    <span className="text-center">Action</span>
                </div>

                {data.map((item, index) => (
                    <div key={index} className='border-solid border-2 border-gray-300 text-sm p-2'>
                        <div className='grid grid-cols-[1.3fr_1.8fr_1.6fr_1.2fr_1fr_0.8fr] items-center gap-2'>
                            {/* <div className='grid grid-cols-[1.6fr_1.3fr_1.8fr_1.6fr_1.2fr_1fr_0.8fr] items-center gap-2'> */}
                            {/* <p className='ml-4'>{index}</p> */}
                            <p className='text-ls ml-4'>{item.name}</p>
                            <p>{item.email}</p>
                            <p>{item.phonenumber}</p>
                            <p className="hidden md:block"></p>
                            <button
                                className="text-blue-500"
                                onClick={() => handleEditClick(item)}
                            >Update
                            </button>
                            <p onClick={() => deleteUser(item._id)} className=' text-right md:text-center cursor-pointer text-red-500'>Delete</p>
                        </div>
                        {editUserId === item._id && (
                            <div className="mt-2 border p-2 bg-gray-100">
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 p-1 w-full mb-2"
                                    placeholder="Enter new username"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={editFormData.email}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 p-1 w-full mb-2"
                                    placeholder="Enter new email"
                                />

                                <input
                                    type="text"
                                    name="phonenumber"
                                    value={editFormData.phonenumber}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 p-1 w-full mb-2"
                                    placeholder="Enter new phone number"
                                />

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleUpdateSubmit(item._id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >Update
                                    </button>
                                    <button
                                        onClick={handleCancelClick}
                                        className="bg-gray-500 text-white px-3 py-1 rounded"
                                    >Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default User;
