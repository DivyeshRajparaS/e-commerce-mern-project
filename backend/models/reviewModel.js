import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const reviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

reviewSchema.plugin(mongoosePaginate);

export const Review = mongoose.model("Review", reviewSchema);