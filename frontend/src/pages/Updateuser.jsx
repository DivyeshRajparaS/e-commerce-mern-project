import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Updateuser = () => {
    const { updatefor } = useParams();
    const { userupdate, emailupdate, passwordupdate, phnupdate, backendUrl, navigate, setCartItems, setToken, token } = useContext(ShopContext);
    const [password, setPassword] = useState('');
    const [updateusername, setUpdateusername] = useState('');
    const [updateemail, setUpdateemail] = useState('');
    const [updatepassword, setUpdatepassword] = useState('');
    const [updatephn, setUpdatephn] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const formatPhoneNumber = (value) => {
        let formattedValue = value.replace(/\D/g, "");

        if (formattedValue.length > 5) {
            formattedValue = formattedValue.slice(0, 5) + "-" + formattedValue.slice(5, 10);
        }

        return formattedValue.slice(0, 12);
    };

    const handleChange = (e) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setUpdatephn(formattedValue);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (userupdate === true) {
                const response = await axios.post(backendUrl + '/api/user/updateuser/username', { password, updateusername }, { withCredentials: true });

                if (response.data.success) {
                    toast.success("Username successfully updated");
                    setPassword('');
                    setUpdateusername('');
                } else {
                    toast.error(response.data.message);
                }
            } else if (emailupdate === true) {
                const response = await axios.post(backendUrl + '/api/user/updateuser/email', { password, updateemail }, { withCredentials: true })

                if (response.data.success) {
                    toast.success("Email successfully updated")
                    localStorage.removeItem('token');
                    setToken('');
                    setCartItems({});
                } else {
                    toast.error(response.data.message);
                }
            } else if (passwordupdate === true) {
                const response = await axios.post(backendUrl + '/api/user/updateuser/password', { password, updatepassword }, { withCredentials: true })

                if (response.data.success) {
                    toast.success("Password successfully updated");
                    localStorage.removeItem('token');
                    setToken('');
                    setCartItems({});
                } else {
                    toast.error(response.data.message);
                }
            } else if (phnupdate === true) {
                const response = await axios.post(backendUrl + '/api/user/updateuser/phonenumber', { password, updatephn }, { withCredentials: true });

                if (response.data.success) {
                    toast.success("Phone number successfully updated");
                    localStorage.removeItem('token');
                    setToken('');
                    setCartItems({});
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong!!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showPasswortBtn = () => {
        setShowPassword(!showPassword);
        if (showPassword === true) {
            document.getElementById("password").type = "text";
        } else {
            document.getElementById("password").type = "password";
        }
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    {userupdate ? <p className='prata-regular text-3xl dark:text-white'>Update Username</p> : ''}
                    {emailupdate ? <p className='prata-regular text-3xl dark:text-white'>Update Email</p> : ''}
                    {passwordupdate ? <p className='prata-regular text-3xl dark:text-white'>Update Password</p> : ''}
                    {phnupdate ? <p className='prata-regular text-3xl dark:text-white'>Update Phone number</p> : ''}
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800 dark:bg-white' />
                </div>
                <input type="password" placeholder='Password' autoComplete="new-password" className='w-full px-3 py-2 border border-gray-800' value={password} onChange={(e) => setPassword(e.target.value)} required />
                {userupdate ?
                    <>
                        <input type="text" placeholder='New Username' className='w-full px-3 py-2 border border-gray-800' value={updateusername} onChange={(e) => setUpdateusername(e.target.value)} required />
                        <button className='bg-black text-white font-light px-8 py-2 mt-4'>Update username</button>
                    </> : ''}
                {emailupdate ?
                    <>
                        <input type="email" placeholder='New Email' className='w-full px-3 py-2 border border-gray-800' value={updateemail} onChange={(e) => setUpdateemail(e.target.value)} required />
                        <button className='bg-black text-white font-light px-8 py-2 mt-4'>Update Email</button>
                    </> : ''}
                {passwordupdate ?
                    <>
                        <div className='w-full flex justify-center items-center'>
                            <input onChange={(e) => setUpdatepassword(e.target.value)} id='password' value={updatepassword} type="password" className='w-full px-3 py-2 border-r-0 border border-gray-800' placeholder='New Password' required />
                            <div onClick={() => showPasswortBtn()} className='border border-l-0 border-black p-[5px] cursor-pointer dark:bg-white'>
                                {
                                    showPassword ?
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C3.75612 8.07914 4.32973 7.43025 5 6.82137" stroke="#484848" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#484848" strokeWidth="1.5"></path> </g></svg>
                                        :
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#484848"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#484848" strokeWidth="1.416" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                }
                            </div>
                        </div>
                        <button className='bg-black text-white font-light px-8 py-2 mt-4'>Update password</button>
                    </> : ''}
                {phnupdate ?
                    <>
                        <input type="tel" maxLength="12" value={updatephn} onChange={handleChange} required className=' w-full px-3 py-2 border border-gray-800' placeholder='New Phone Number' />
                        <button className='bg-black text-white font-light px-8 py-2 mt-4'>Update Phone number</button>
                    </> : ''}

            </form>
        </div>
    )
}

export default Updateuser;