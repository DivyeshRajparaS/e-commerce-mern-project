import React, { useState } from 'react';
import Userinfo from '../components/Userinfo.jsx';
import Userupdate from '../components/Userupdate.jsx';
import Usersetting from '../components/Usersetting.jsx';
import Userorders from '../components/Userorders.jsx';

const Profile = () => {
    const [defaultProfile, setDefaultprofile] = useState('profile');

    return (
        <div className='flex justify-center flex-row items-center mt-12 gap-10 max-lg:flex-col'>
            <div className="profile-card w-[350px]  rounded-md shadow-xl overflow-hidden z-0 relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
                <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
                    <div className="img_container w-full flex items-center justify-center relative z-40 after:absolute after:h-[6px] after:w-full after:bg-[#58b0e0] after:top-4 after:group-hover:size-[1%] after:delay-300 after:group-hover:delay-0 after:group-hover:transition-all after:group-hover:duration-300 after:transition-all after:duration-300 before:absolute before:h-[6px] before:w-full before:bg-[#58b0e0] before:bottom-4 before:group-hover:size-[1%] before:delay-300 before:group-hover:delay-0 before:group-hover:transition-all before:group-hover:duration-300 before:transition-all before:duration-300">
                        <svg
                            className="size-36 z-40 border-4 border-white rounded-full group-hover:border-8 group-hover:transition-all group-hover:duration-300 transition-all duration-300"
                            id="avatar"
                            viewBox="0 0 61.8 61.8"
                            xmlns="http://www.w3.org/2000/svg" >
                            <g data-name="Layer 2">
                                <g data-name="—ÎÓÈ 1">
                                    <path d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z"
                                        fillRule="evenodd"
                                        fill="#ffe8be"></path>
                                    <circle fill="#58b0e0" r="30.9" cy="30.9" cx="30.9"></circle>
                                    <path d="M45.487 19.987l-29.173.175s1.048 16.148-2.619 21.21h35.701c-.92-1.35-3.353-1.785-3.909-21.385z"
                                        fillRule="evenodd"
                                        fill="#60350a"></path>
                                    <path d="M18.135 45.599l7.206-3.187 11.55-.3 7.42 3.897-5.357 11.215-7.613 4.088-7.875-4.35-5.331-11.363z"
                                        fillRule="evenodd"
                                        fill="#d5e1ed"></path>
                                    <path d="M24.744 38.68l12.931.084v8.949l-12.931-.085V38.68z"
                                        fillRule="evenodd"
                                        fill="#f9dca4"></path>
                                    <path opacity=".11"
                                        d="M37.677 38.778v3.58a9.168 9.168 0 0 1-.04 1.226 6.898 6.898 0 0 1-.313 1.327c-4.37 4.165-11.379.78-12.49-6.333z"
                                        fillRule="evenodd"></path>
                                    <path d="M52.797 52.701a30.896 30.896 0 0 1-44.08-.293l1.221-3.098 9.103-4.122c3.262 5.98 6.81 11.524 12.317 15.455A45.397 45.397 0 0 0 43.2 45.483l8.144 3.853z"
                                        fillRule="evenodd"
                                        fill="#434955"></path>
                                    <path d="M19.11 24.183c-2.958 1.29-.442 7.41 1.42 7.383a30.842 30.842 0 01-1.42-7.383zM43.507 24.182c2.96 1.292.443 7.411-1.419 7.384a30.832 30.832 0 001.419-7.384z"
                                        fillRule="evenodd"
                                        fill="#f9dca4"></path>
                                    <path d="M31.114 8.666c8.722 0 12.377 6.2 12.601 13.367.307 9.81-5.675 21.43-12.6 21.43-6.56 0-12.706-12.018-12.333-21.928.26-6.953 3.814-12.869 12.332-12.869z"
                                        fillRule="evenodd"
                                        fill="#ffe8be"></path>
                                    <path d="M33.399 24.983a7.536 7.536 0 0 1 5.223-.993h.005c5.154.63 5.234 2.232 4.733 2.601a2.885 2.885 0 0 0-.785 1.022 6.566 6.566 0 0 1-1.052 2.922 5.175 5.175 0 0 1-3.464 2.312c-.168.027-.34.048-.516.058a4.345 4.345 0 0 1-3.65-1.554 8.33 8.33 0 0 1-1.478-2.53v.003s-.797-1.636-2.072-.114a8.446 8.446 0 0 1-1.52 2.64 4.347 4.347 0 0 1-3.651 1.555 5.242 5.242 0 0 1-.516-.058 5.176 5.176 0 0 1-3.464-2.312 6.568 6.568 0 0 1-1.052-2.921 2.75 2.75 0 0 0-.77-1.023c-.5-.37-.425-1.973 4.729-2.603h.002a7.545 7.545 0 0 1 5.24 1.01l-.001-.001.003.002.215.131a3.93 3.93 0 0 0 3.842-.148l-.001.001zm-4.672.638a6.638 6.638 0 0 0-6.157-.253c-1.511.686-1.972 1.17-1.386 3.163a5.617 5.617 0 0 0 .712 1.532 4.204 4.204 0 0 0 3.326 1.995 3.536 3.536 0 0 0 2.966-1.272 7.597 7.597 0 0 0 1.36-2.37c.679-1.78.862-1.863-.82-2.795zm10.947-.45a6.727 6.727 0 0 0-5.886.565c-1.538.911-1.258 1.063-.578 2.79a7.476 7.476 0 0 0 1.316 2.26 3.536 3.536 0 0 0 2.967 1.272 4.228 4.228 0 0 0 .43-.048 4.34 4.34 0 0 0 2.896-1.947 5.593 5.593 0 0 0 .684-1.44c.702-2.25.076-2.751-1.828-3.451z"
                                        fillRule="evenodd"
                                        fill="#464449"></path>
                                    <path d="M17.89 25.608c0-.638.984-.886 1.598 2.943a22.164 22.164 0 0 0 .956-4.813c1.162.225 2.278 2.848 1.927 5.148 3.166-.777 11.303-5.687 13.949-12.324 6.772 3.901 6.735 12.094 6.735 12.094s.358-1.9.558-3.516c.066-.538.293-.733.798-.213C48.073 17.343 42.3 5.75 31.297 5.57c-15.108-.246-17.03 16.114-13.406 20.039z"
                                        fillRule="evenodd"
                                        fill="#8a5c42"></path>
                                    <path d="M24.765 42.431a14.125 14.125 0 0 0 6.463 5.236l-4.208 6.144-5.917-9.78z"
                                        fillRule="evenodd"
                                        fill="#fff"></path>
                                    <path d="M37.682 42.431a14.126 14.126 0 0 1-6.463 5.236l4.209 6.144 5.953-9.668z"
                                        fillRule="evenodd"
                                        fill="#fff"></path>
                                    <circle fill="#434955" r=".839" cy="52.562" cx="31.223"></circle>
                                    <circle fill="#434955" r=".839" cy="56.291" cx="31.223"></circle>
                                    <path d="M41.997 24.737c1.784.712 1.719 1.581 1.367 1.841a2.886 2.886 0 0 0-.785 1.022 6.618 6.618 0 0 1-.582 2.086v-4.949zm-21.469 4.479a6.619 6.619 0 0 1-.384-1.615 2.748 2.748 0 0 0-.77-1.023c-.337-.249-.413-1.06 1.154-1.754z"
                                        fillRule="evenodd"
                                        fill="#464449">
                                    </path>
                                </g>
                            </g>
                        </svg>
                        <div className="absolute bg-[#58b0e0] z-10 size-[60%] w-full group-hover:size-[1%] group-hover:transition-all group-hover:duration-300 transition-all duration-300 delay-700 group-hover:delay-0"></div>
                    </div>
                </div>
                <div className="headings *:text-center *:leading-4">
                    <p className="text-xl font-serif font-semibold text-[#434955]">WELCOME</p>
                    <p className="text-sm font-semibold text-[#434955]">user</p>
                </div>
                <div className="w-full items-center justify-center flex">
                    <ul className="flex flex-col items-start gap-2 has-[:last]:border-b-0 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3">
                        <li>
                            <svg
                                className="fill-stone-700 group-hover:fill-[#58b0e0]"
                                height="20"
                                width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M12.1605 10.87C12.0605 10.86 11.9405 10.86 11.8305 10.87C9.45055 10.79 7.56055 8.84 7.56055 6.44C7.56055 3.99 9.54055 2 12.0005 2C14.4505 2 16.4405 3.99 16.4405 6.44C16.4305 8.84 14.5405 10.79 12.1605 10.87Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7.1607 14.56C4.7407 16.18 4.7407 18.82 7.1607 20.43C9.9107 22.27 14.4207 22.27 17.1707 20.43C19.5907 18.81 19.5907 16.17 17.1707 14.56C14.4307 12.73 9.9207 12.73 7.1607 14.56Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <button onClick={() => setDefaultprofile('profile')}>{defaultProfile === 'profile' ? <p className='text-2xl transition-all'>Your Profile</p> : <p>Your Profile</p>}</button>
                        </li>
                        <li>
                            <svg fill="#000000" height="20" width="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M434.546,151.26h-2.069V10.199C432.476,4.566,427.909,0,422.277,0H89.723c-5.632,0-10.199,4.566-10.199,10.199v242.033 h-2.069c-33.18,0-60.175,26.994-60.175,60.175c0,33.181,26.995,60.175,60.175,60.175h2.069v129.218 c0,5.633,4.567,10.199,10.199,10.199h332.554c5.632,0,10.199-4.566,10.199-10.199v-230.19h2.069 c33.18,0,60.175-26.994,60.175-60.175S467.726,151.26,434.546,151.26z M79.523,352.185h-2.069 c-21.933,0-39.777-17.844-39.777-39.777s17.844-39.777,39.777-39.777h2.069V352.185z M412.078,151.26H382.83v-18.488 c0-8.314-4.299-15.76-11.499-19.916c-7.201-4.157-15.798-4.158-23,0.001l-49.678,28.686c-7.201,4.157-11.498,11.603-11.498,19.916 c0,8.313,4.298,15.759,11.497,19.915l49.679,28.687h0.001c3.6,2.08,7.549,3.118,11.5,3.118c3.949,0,7.898-1.039,11.499-3.118 c7.201-4.157,11.499-11.603,11.499-19.917v-18.488h29.248v319.945H99.922V372.583h124.101v18.488 c0,8.314,4.299,15.76,11.499,19.917c3.6,2.079,7.549,3.118,11.499,3.118c3.95,0,7.9-1.039,11.501-3.119l49.678-28.686 c7.201-4.157,11.498-11.603,11.498-19.916s-4.298-15.759-11.497-19.916l-49.679-28.687h-0.001c-7.202-4.158-15.8-4.158-22.999,0 c-7.201,4.157-11.499,11.602-11.499,19.916v18.488h-124.1V20.398h312.156V151.26z M362.431,132.772v57.375 c0,1.24-0.707,1.909-1.299,2.251s-1.527,0.62-2.6,0l-49.68-28.687c-1.074-0.62-1.298-1.567-1.298-2.251 c0-0.684,0.225-1.631,1.299-2.252l49.678-28.686c1.075-0.62,2.007-0.343,2.601,0C361.723,130.864,362.431,131.532,362.431,132.772 z M244.421,391.07v-57.375c0-1.24,0.707-1.908,1.299-2.251c0.337-0.195,0.783-0.368,1.302-0.368 c0.396,0.001,0.833,0.101,1.297,0.369l49.68,28.687c1.074,0.62,1.298,1.567,1.298,2.251c0,0.684-0.225,1.631-1.299,2.251 l-49.678,28.686c-1.075,0.622-2.009,0.343-2.601,0C245.128,392.979,244.421,392.31,244.421,391.07z M434.546,251.213h-2.069 v-79.554h2.069c21.933,0,39.777,17.844,39.777,39.777S456.478,251.213,434.546,251.213z"></path> </g> </g> <g> <g> <path d="M364.111,62.215h-7.139c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h7.139 c5.632,0,10.199-4.566,10.199-10.199C374.31,66.781,369.743,62.215,364.111,62.215z"></path> </g> </g> <g> <g> <path d="M317.195,62.215H147.888c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h169.307 c5.632,0,10.199-4.566,10.199-10.199C327.394,66.781,322.827,62.215,317.195,62.215z"></path> </g> </g> <g> <g> <path d="M285.577,239.681H147.888c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h137.689 c5.632,0,10.199-4.566,10.199-10.199S291.209,239.681,285.577,239.681z"></path> </g> </g> <g> <g> <path d="M239.681,123.41h-91.793c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h91.793 c5.632,0,10.199-4.566,10.199-10.199S245.313,123.41,239.681,123.41z"></path> </g> </g> <g> <g> <path d="M239.681,178.486h-91.793c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h91.793 c5.632,0,10.199-4.566,10.199-10.199C249.88,183.052,245.313,178.486,239.681,178.486z"></path> </g> </g> </g></svg>
                            <button onClick={() => setDefaultprofile('update')}>{defaultProfile === 'update' ? <p className='text-2xl transition-all'>Update</p> : <p>Update</p>}</button>
                        </li>
                        <li>
                            <svg
                                className="fill-stone-700 group-hover:fill-[#58b0e0]"
                                height="20"
                                width="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path className="fill-stone-700 group-hover:fill-[#58b0e0]" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"></path></g></svg>
                            <button onClick={() => setDefaultprofile('settings')}>{defaultProfile === 'settings' ? <p className='text-2xl transition-all'>Settings</p> : <p>Settings</p>}</button>
                        </li>
                        <li>
                            <svg id="map"
                                viewBox="0 0 16 16"
                                className="fill-stone-700 group-hover:fill-[#58b0e0]"
                                height="15"
                                width="15"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C5.2 0 3 2.2 3 5s4 11 5 11 5-8.2 5-11-2.2-5-5-5zm0 8C6.3 8 5 6.7 5 5s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="#444"></path>
                            </svg>
                            <button onClick={() => setDefaultprofile('yourOrders')}>{defaultProfile === 'yourOrders' ? <p className='text-2xl transition-all'>Your orders</p> : <p>Your orders</p>}</button>
                        </li>
                    </ul>
                </div>
                <hr className="w-full group-hover:h-5 h-3 bg-[#58b0e0] group-hover:transition-all group-hover:duration-300 transition-all duration-300" />
            </div>

            {/* right side section  */}
            <div className='border-2 dark:border-gray-500 overflow-scroll p-10 h-[400px] w-[900px] max-lg:w-auto'>
                {defaultProfile === 'profile' ? <Userinfo /> : ''}
                {defaultProfile === 'update' ? <Userupdate /> : ''}
                {defaultProfile === 'settings' ? <Usersetting /> : ''}
                {defaultProfile === 'yourOrders' ? <Userorders /> : ''}
            </div>
        </div>
    )
}

export default Profile;