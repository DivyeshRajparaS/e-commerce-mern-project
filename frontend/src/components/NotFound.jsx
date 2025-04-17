import React from 'react'

const NotFound = () => {
    return (
        <div className='h-auto w-auto py-40 flex justify-center items-center flex-col text-xl'>
            <p className='dark:text-white'>404 - Page Not Found</p>
            <p className='dark:text-white'>The page you are looking for does not exist.</p>
            <a href="/" className="mt-4 text-blue-500 hover:underline">Go back to Home</a>
        </div>
    )
}

export default NotFound;