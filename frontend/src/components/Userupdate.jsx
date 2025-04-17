import React, { useContext } from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Userupdate = () => {
  const { navigate, setUserupdate, setEmailupdate, setPasswordupdate, setPhnupdate } = useContext(ShopContext);

  const changeusername = () => {
    setUserupdate(true);
    setEmailupdate(false);
    setPasswordupdate(false);
    setPhnupdate(false);
  }

  const changeemail = () => {
    setUserupdate(false);
    setEmailupdate(true);
    setPasswordupdate(false);
    setPhnupdate(false);
  }

  const changepassword = () => {
    setUserupdate(false);
    setEmailupdate(false);
    setPasswordupdate(true);
    setPhnupdate(false);
  }

  const changephonenumber = () => {
    setUserupdate(false);
    setEmailupdate(false);
    setPasswordupdate(false);
    setPhnupdate(true);
  }

  return (
    <>
      <div className='text-2xl'>
        <Title text1={'Update'} text2={'Profile'} />
      </div>

      <div className='flex flex-col justify-center gap-10 mt-4'>
        <div className='flex justify-around items-center'>
          <Link to={`/profile/updateuser/updateUsername`} className='flex justify-center items-center flex-col' onClick={() => changeusername()}>
            <svg width="64px" height="64px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z" fill="#4A5699"></path><path d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z" fill="#C45FA0"></path><path d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z" fill="#E5594F"></path></g></svg>
            <p className='w-10 flex justify-center text-center dark:text-gray-300'>Change Username</p>
          </Link>
          <Link to={`/profile/updateuser/updateEmail`} className='flex justify-center items-center flex-col' onClick={() => changeemail()}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" width="64px" height="64px" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
            <p className='w-10 flex justify-center text-center dark:text-gray-300'>Change Email</p>
          </Link>
        </div>
        <div className='flex justify-around items-center' >
          <Link to={`/profile/updateuser/updatePassword`} className='flex justify-center items-center flex-col' onClick={() => changepassword()}>
            <img src={assets.change_password} alt="" />
            <p className='w-10 flex justify-center text-center dark:text-gray-300'>Change Password</p>
          </Link>
          <Link to={`/profile/updateuser/updatePhonenumber`} className='flex justify-center items-center flex-col' onClick={() => changephonenumber()}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.5 5.25H18.75V3.5C18.75 3.09 18.41 2.75 18 2.75C17.59 2.75 17.25 3.09 17.25 3.5V5.25H15.5C15.09 5.25 14.75 5.59 14.75 6C14.75 6.41 15.09 6.75 15.5 6.75H17.25V8.5C17.25 8.91 17.59 9.25 18 9.25C18.41 9.25 18.75 8.91 18.75 8.5V6.75H20.5C20.91 6.75 21.25 6.41 21.25 6C21.25 5.59 20.91 5.25 20.5 5.25Z" fill="#d01b1b"></path> <path opacity="0.4" d="M11.79 14.21L8.52 17.48C8.16 17.16 7.81 16.83 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.09 13.57 11.44 13.91 11.79 14.21Z" fill="#d01b1b"></path> <path d="M21.9696 18.33C21.9696 18.61 21.9196 18.9 21.8196 19.18C21.7896 19.26 21.7596 19.34 21.7196 19.42C21.5496 19.78 21.3296 20.12 21.0396 20.44C20.5496 20.98 20.0096 21.37 19.3996 21.62C19.3896 21.62 19.3796 21.63 19.3696 21.63C18.7796 21.87 18.1396 22 17.4496 22C16.4296 22 15.3396 21.76 14.1896 21.27C13.0396 20.78 11.8896 20.12 10.7496 19.29C10.3596 19 9.96961 18.71 9.59961 18.4L12.8696 15.13C13.1496 15.34 13.3996 15.5 13.6096 15.61C13.6596 15.63 13.7196 15.66 13.7896 15.69C13.8696 15.72 13.9496 15.73 14.0396 15.73C14.2096 15.73 14.3396 15.67 14.4496 15.56L15.2096 14.81C15.4596 14.56 15.6996 14.37 15.9296 14.25C16.1596 14.11 16.3896 14.04 16.6396 14.04C16.8296 14.04 17.0296 14.08 17.2496 14.17C17.4696 14.26 17.6996 14.39 17.9496 14.56L21.2596 16.91C21.5196 17.09 21.6996 17.3 21.8096 17.55C21.9096 17.8 21.9696 18.05 21.9696 18.33Z" fill="#d01b1b"></path> </g></svg><p className='w-12 flex justify-center text-center dark:text-gray-300'>Change Phone Number</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Userupdate;