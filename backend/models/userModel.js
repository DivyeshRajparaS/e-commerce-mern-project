import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    },
    phonenumber: {
        type: String,
        required: true
    },
    usecoupon: {
        type: Boolean,
        required: true
    },
    couponAlreadyAdded: {
        type: Boolean,
        required: true
    },
    refreshToken: {
        type: String,
        default: ""
    }
}, { minimize: false })

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET
    )
}

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;