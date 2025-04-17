import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Title from '../components/Title';

function Reviews() {
    const { productId } = useParams();
    const { backendUrl, token } = useContext(ShopContext);
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null); // Track the review being updated
    const [updatedText, setUpdatedText] = useState('');
    const [updatedRating, setUpdatedRating] = useState(0);
    const [sortType, setSortType] = useState('latest');

    const getReviews = async () => {
        const response = await axios.post(backendUrl + `/api/review/getAllReviews/${productId}`, {}, { withCredentials: true });
        if (response.data.success) {
            setReviews(response.data.data);
        }
    };

    const deleteReview = async (id) => {
        try {
            const review = await axios.post(backendUrl + "/api/review/deleteReview", { id }, { withCredentials: true });
            if (review.data.success) {
                toast.success("Review deleted successfully");
                setReviews(reviews.filter(r => r._id !== id));
            } else {
                toast.error(review.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleUpdateClick = (review) => {
        setEditingReview(review._id);
        setUpdatedText(review.review);
        setUpdatedRating(review.rating);
    };

    const handleUpdateSubmit = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/review/updateReview",
                { id, review: updatedText, rating: updatedRating },
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success("Review updated successfully");
                setEditingReview(null);
                getReviews();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const setRating = () => {
        let coppied = reviews.slice();

        switch (sortType) {
            case 'latest':
                getReviews();
                break;

            case 'low-high':
                setReviews(coppied.sort((a, b) => a.rating - b.rating));
                break;

            case 'high-low':
                setReviews(coppied.sort((a, b) => b.rating - a.rating));
                break;

            default:
                setReviews(reviews);
                break;
        }
    }

    useEffect(() => {
        getReviews();
    }, []);

    useEffect(() => {
        setRating();
    }, [sortType])

    return (
        <>
            {token ?
                <div className="mt-20">
                    <div className="flex justify-between text-base sm:text-2xl flex-wrap mb-4">
                        <Title text1={'ALL'} text2={'REVIEWS'} />
                        <select onChange={(e) => setSortType(e.target.value)} className='border-2 h-10 border-gray-300 text-sm px-2'>
                            <option value="latest">Sort by: Latest</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-4 border border-gray-300 dark:border-gray-500 px-6 py-6 bg-white dark:bg-gray-800">
                        <p className='dark:text-white'>Total reviews ({reviews.length})</p>
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4 flex flex-col items-start gap-3">
                                <div className="flex items-center flex-wrap gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{review.userReview.name}</p>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <FontAwesomeIcon
                                                key={num}
                                                icon={faStar}
                                                className={`text-lg ${review.rating >= num ? `text-yellow-500` : `text-gray-300`}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-base text-gray-800 dark:text-gray-300 ml-12">{review.review}</p>

                                {review.isWrited && (
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => handleUpdateClick(review)}
                                            className="bg-gray-500 hover:bg-gray-600 px-3 py-1 text-white rounded-full transition">
                                            Update Review
                                        </button>
                                        <button
                                            onClick={() => deleteReview(review._id)}
                                            className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white rounded-full transition">
                                            Delete Review
                                        </button>
                                    </div>
                                )}

                                {editingReview === review._id && (
                                    <div className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg mt-3">
                                        <textarea
                                            className="w-full p-2 border border-gray-400 rounded-lg"
                                            value={updatedText}
                                            onChange={(e) => setUpdatedText(e.target.value)}
                                            rows="3"
                                        ></textarea>

                                        <div className="flex items-center gap-3 mt-2">
                                            <p className="text-gray-700 dark:text-gray-300">Rating:</p>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <FontAwesomeIcon
                                                    key={num}
                                                    icon={faStar}
                                                    className={`text-lg cursor-pointer ${updatedRating >= num ? "text-yellow-500" : "text-gray-300"}`}
                                                    onClick={() => setUpdatedRating(num)}
                                                />
                                            ))}
                                        </div>

                                        <div className="flex gap-3 mt-3">
                                            <button
                                                onClick={() => handleUpdateSubmit(review._id)}
                                                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 text-white rounded-full transition">
                                                Submit
                                            </button>
                                            <button
                                                onClick={() => setEditingReview(null)}
                                                className="bg-gray-500 hover:bg-gray-600 px-3 py-1 text-white rounded-full transition">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {reviews.length === 0 && (
                            <div className="flex justify-center items-center">
                                <p className="text-xl text-gray-700 dark:text-gray-300">No reviews available</p>
                            </div>
                        )}
                    </div>
                </div>
                :
                <>
                    <div className='flex pt-14 justify-center items-center'>
                        <p className='text-2xl'>Login to see all reviews</p>
                    </div>
                </>
            }
        </>
    );
}

export default Reviews;
