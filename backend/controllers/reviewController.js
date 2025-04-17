import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { Review } from "../models/reviewModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const writeReview = asyncHandler(async (req, res) => {
    // get the review, productId, userId from the user
    // if review is not added then give the error
    // get the productId and userId
    // save this data into the database
    // give review added
    const { review, star } = req.body;
    const { productId } = req.params;

    const user = req.user;

    if (!user) {
        return res.status(400).json({ success: false, message: "Please login to add review" });
    }

    if (!review) {
        res.status(200).json({ success: false, message: "Review is required" });
    }

    if (!productId) {
        return res.status(200).json({ success: false, message: "Please refresh your page and try again" });
    }

    const findReview = await Review.findOne({
        $or: [{ product: productId }, { user: user._id }]
    });

    // if (findReview) {
    //     return res.status(200).json({ success: false, message: "You already write the review" });
    // }

    const uploadReview = await Review.create({
        user: user._id,
        product: productId,
        rating: star,
        review: review
    })

    if (uploadReview) {
        return res.status(200).json({ success: true, message: "Review added successfully" });
    }
})

const showLatestReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        return res.status(200).json({ success: false, message: "Please refresh your page and try again" });
    }

    // const findReviews = await Review.find({ product: productId });
    const findReviews = await Review.aggregate([
        {
            $match: {
                product: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userReview",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$userReview"
        },
        {
            $project: {
                _id: 1,
                review: 1,
                userReview: 1,
                isWrited: 1,
                createdAt: 1,
                rating: 1
            }
        }
    ]).sort({ createdAt: -1 }).limit(8)

    return res.status(200).json(new ApiResponse(200, findReviews, "Data get successfully"));
})

const getAllReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        return res.status(200).json({ success: false, message: "Please refresh your page and try again" });
    }

    // const findReviews = await Review.find({ product: productId });
    const findReviews = await Review.aggregate([
        {
            $match: {
                product: new mongoose.Types.ObjectId(productId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userReview",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                isWrited: {
                    $cond: {
                        if: { $in: [req.user?._id, "$userReview._id"] },
                        then: true,
                        else: false
                    }
                }
            },
        },
        {
            $unwind: "$userReview"
        },
        {
            $project: {
                _id: 1,
                review: 1,
                userReview: 1,
                isWrited: 1,
                createdAt: 1,
                rating: 1
            }
        }
    ]).sort({ createdAt: -1 })

    return res.status(200).json(new ApiResponse(200, findReviews, "Data get successfully"));
})

const updateReview = asyncHandler(async (req, res) => {
    const { id, review, rating } = req.body;

    if (!review) {
        return res.status(400).json({ success: false, message: "Review is required" });
    }

    const findReview = await Review.findById(id);
    if (!findReview) {
        return res.status(404).json({ success: false, message: "Reivew is not found" });
    }

    findReview.review = review;
    findReview.rating = rating;
    await findReview.save();

    return res.status(200).json({ success: true, message: "Reivew updated successfully" });
})

const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Please refresh page and try again" })
    }

    const findReview = await Review.findByIdAndDelete({ _id: id });
    if (!findReview) {
        return res.status(404).json({ success: false, message: "Review is not found" });
    }

    return res.status(200).json({ success: true, message: "Review deleted successfully" });
})

export {
    writeReview,
    showLatestReviews,
    getAllReviews,
    updateReview,
    deleteReview,
}