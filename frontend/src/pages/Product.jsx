import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJetFighter, faStar, faUsersRectangle } from "@fortawesome/free-solid-svg-icons"
import { toast } from 'react-toastify';
import axios from 'axios';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [defaultPara, setDefaultPara] = useState('reviews');
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [finalprice, setFinalPrice] = useState();

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  const addtocartbtn = () => {
    if (size === '') {
      toast.error("Please select a size");
    } else {
      if (size === 256) {
      }
      addToCart(productData._id, size);
      toast.success(Toast)
    }
  }

  const getReviews = async () => {
    const reviews = await axios.post(backendUrl + `/api/review/getLatestReviews/${productId}`, {}, { withCredentials: true });
    if (reviews.data.success) {
      setReviews(reviews.data.data);
    }
  }

  // const increasePrice = async () => {
  //   let offamount = 0;
  //   console.log(size);

  //   if (productData.sizes?.length > 1) {
  //     switch (size) {
  //       case "128GB":
  //         offamount = productData.price * 0.05;
  //         break;

  //       case "256GB":
  //         offamount = productData.price * 0.15;
  //         break;

  //       case "512GB":
  //         offamount = productData.price * 0.25;
  //         break;

  //       case "1TB":
  //         offamount = productData.price * 0.35;
  //         break;

  //       default:
  //         offamount = 0;
  //         break;
  //     }
  //   } else {
  //     const newPrice = productData.price + offamount;
  //     setFinalPrice(newPrice.toFixed(2));
  //   }

  //   const newPrice = productData.price + offamount;
  //   setFinalPrice(newPrice.toFixed(2));
  // };

  const Toast = () => {
    return (
      <Link to='/cart'>See your cart <span className='text-blue-600'>Click Here</span></Link>
    )
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const writeReview = await axios.post(backendUrl + `/api/review/writeReview/${productId}`, { review, star: rating }, { withCredentials: true });
    if (writeReview.data.success) {
      toast.success("Review submited");
      setReview("");
      setRating(0);
    } else {
      toast.error(review.data.message);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // useEffect(() => {
  //   increasePrice();
  // }, [size])

  useEffect(() => {
    getReviews();
  }, [reviews])

  return (
    <>
      {
        productData ?
          <div className='border-t-2 dark:border-gray-500 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
              <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                  {
                    productData.image.map((item, index) => (
                      <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                    ))
                  }
                </div>
                <div className='w-full sm:w-[80%]'>
                  <img className='w-full h-auto' src={image} alt="" />
                </div>
              </div>

              <div className='flex-1'>
                <h1 className='font-medium text-2xl mt-2 dark:text-white'>{productData.name}</h1>
                <div className=' flex items-center gap-1 mt-2'>
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                  <p className='pl-2 dark:text-white'>(122)</p>
                </div>
                <p className='mt-5 text-3xl font-medium dark:text-white'>{currency}{productData.price.toFixed(2)}</p>
                <p className='mt-5 text-gray-500 md:w-4/5 dark:text-white'>{productData.description}</p>
                <div className='flex flex-col gap-4 my-8'>
                  <p className='dark:text-white'>Select Storage</p>
                  <div className='flex gap-2'>
                    {productData.sizes.map((item, index) => (
                      <div key={index}>
                        <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => addtocartbtn()} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                <hr className='mt-8 sm:w-4/5' />
                <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                  <p className='dark:text-gray-300'>100% Original product.</p>
                  <p className='dark:text-gray-300'>Cash on delivery is available on this product.</p>
                  <p className='dark:text-gray-300'>No return and no exchange policy.</p>
                </div>
              </div>
            </div>

            <div className='mt-20'>
              <div className='flex'>
                <button onClick={() => setDefaultPara('reviews')} className={`border dark:border-gray-500 ${defaultPara === 'reviews' ? `font-bold` : ''} px-5 py-3 text-sm dark:text-white`}>Reviews</button>
                <button onClick={() => setDefaultPara('description')} className={`border dark:border-gray-500 ${defaultPara === 'description' ? `font-bold` : ''} px-5 py-3 text-sm dark:text-white`}>Description</button>
              </div>
              <div className='flex flex-col gap-4 dark:border-gray-500 border px-6 py-6 text-sm text-gray-500 dark:text-gray-300'>
                {
                  defaultPara === 'reviews' ?
                    <>
                      <div>
                        <form onSubmit={onSubmitHandler} className='flex flex-col items-start justify-start gap-4'>
                          <textarea rows={4} cols={5} className='w-full px-3 py-2 border border-gray-800' value={review} onChange={(e) => setReview(e.target.value)} placeholder='Write review' required />
                          <div className="flex items-center gap-3 mt-2">
                            <p className="text-gray-700 dark:text-gray-300">Rating:</p>
                            {[1, 2, 3, 4, 5].map(num => (
                              <FontAwesomeIcon
                                key={num}
                                icon={faStar}
                                className={`text-lg cursor-pointer ${rating >= num ? "text-yellow-500" : "text-gray-300"}`}
                                onClick={() => setRating(num)}
                              />
                            ))}
                          </div>
                          <button type='submit' className='btn bg-black text-white font-light px-8 py-2 mt-4'>Submit</button>
                        </form>
                      </div>
                      <div className='flex flex-col gap-4 dark:border-gray-500 px-6 py-6 text-sm text-gray-500 dark:text-gray-300'>
                        {
                          reviews.map((review, index) => (
                            <div key={index} className='border-b-2 pb-4 flex flex-col items-start justify-center gap-3'>
                              <div className="flex items-center flex-wrap gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{review.userReview.name}</p>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map(num => (
                                    <FontAwesomeIcon
                                      key={num}
                                      icon={faStar}
                                      className={`text-lg ${review.rating >= num ? "text-yellow-500" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-base text-gray-800 dark:text-gray-300 ml-12">{review.review}</p>
                            </div>
                          ))
                        }
                        <div className='flex justify-center items-center'>
                          {
                            reviews.length === 0 ?
                              <p className='text-xl'>No reviews available</p>
                              : ''
                          }
                        </div>
                        <div className='flex items-center gap-1'>
                          {
                            token ?
                              <Link className='text-blue-600 text-lg hover:underline' to={`/product/reviews/${productId}`}>See more reviews &#62;</Link>
                              :
                              <Link className='text-blue-600 text-lg hover:underline' to='/login'>See more reviews &#62;</Link>
                          }
                        </div>
                      </div>
                    </> : ''
                }
                {defaultPara === 'description' ?
                  <>
                    <div className='flex flex-col gap-4 dark:border-gray-500 px-6 py-6 text-sm text-gray-500 dark:text-gray-300'>
                      <p>With its sleek design, lightweight build, and multiple color options, the is as stylish as it is functional. Whether you're a professional, a student, or a tech enthusiast, this product is tailored to meet your needs</p>
                      <p>With its sleek design, lightweight build, and multiple color options, the is as stylish as it is functional. Whether you're a professional, a student, or a tech enthusiast, this product is tailored to meet your needs
                        Experience cutting-edge technology Designed for modern users</p>
                      <p>perfect for streaming, gaming, and browsing.</p>
                      <p>warranty and 24/7 customer service.
                        Don’t miss out—upgrade your tech game with the Product today!</p>
                    </div>
                  </> : ''}
              </div>

            </div>

            {/* --------- display related products ---------- */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
          </div>
          :
          <div className="flex flex-col gap-12 sm:flex-row animate-pulse">
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between gap-3 sm:justify-normal sm:w-[18.7%] w-full">
                <div className="w-[24%] sm sm:w-full flex-shrink-0 h-20 sm:h-32 bg-gray-200 rounded"></div>
                <div className="w-[24%] sm sm:w-full flex-shrink-0 h-20 sm:h-32 bg-gray-200 rounded"></div>
                <div className="w-[24%] sm sm:w-full flex-shrink-0 h-20 sm:h-32 bg-gray-200 rounded"></div>
                <div className="w-[10%] sm sm:w-full flex-shrink-0 h-20 sm:h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="w-full sm:w-[80%] h-60 sm:h-[60vh] bg-gray-200 rounded"></div>
            </div>
            <div className="flex-1">
              <div className='h-6 w-1/2 mb-4 bg-gray-200 rounded'></div>
              <div className="flex items-center gap-1 mt-2">
                <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-10 w-1/4 mt-5 bg-gray-200 rounded"></div>
              <div className="h-16 w-4/5 mt-5 bg-gray-200 rounded "></div>
              <div className="flex flex-col gap-4 my-8">
                <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-10 w-10 bg-gray-200 rounded"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-10 w-1/3 bg-gray-200 rounded mt-6 "></div>
              <hr className="mt-8 sm:w-4/5" />
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p className="h-4 w-full mt-1 bg-gray-200 rounded"></p>
                <p className="h-4 w-full mt-1 bg-gray-200 rounded"></p>
                <p className="h-4 w-full mt-1 bg-gray-200 rounded"></p>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Product;