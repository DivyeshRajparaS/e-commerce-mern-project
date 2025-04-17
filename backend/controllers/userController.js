import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await userModel.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
}

const findUser = async (token) => {
    try {
        const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
        const data = await userModel.findOne({ _id: decoded._id });
        return data;
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };

        return res
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ success: true, accessToken });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phonenumber } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phonenumber,
            usecoupon: false,
            couponAlreadyAdded: false
        })

        const user = await newUser.save()

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };

        res
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ success: true, accessToken })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const logoutUser = asyncHandler(async (req, res) => {
    await userModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ success: true, message: "Logout sucessfully" })
})

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const showData = async (req, res) => {
    try {
        const data = await req.user;

        return res.json({ success: true, data });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const changeUsername = async (req, res) => {
    try {
        const { password, updateusername } = req.body;

        const findUser = await userModel.findOne({ name: updateusername });
        if (findUser) {
            return res.json({ success: false, message: "Username already exists" });
        }

        const user = await userModel.findById(req.user._id)
        if (!user) {
            return res.json({ success: false, message: "Please login again" });
        }

        const checkPassword = await user.isPasswordCorrect(password);
        if (!checkPassword) {
            return res.json({ success: false, message: "Password is wrong" });
        }

        user.name = updateusername;
        await user.save({ validateBeforeSave: false });

        res.json({ success: true, message: "User updated successfully" })
    } catch (error) {
        console.log(error);
    }
}

const changeEmail = async (req, res) => {
    try {
        const { updateemail, password } = req.body;

        const checkEmail = await userModel.findOne({ email: updateemail });
        if (checkEmail) {
            return res.json({ success: false, message: "Email is already exists" });
        }

        const user = await userModel.findById(req.user._id)
        if (!user) {
            return res.json({ success: false, message: "Please login again" })
        }

        const checkPassword = await user.isPasswordCorrect(password);
        if (!checkPassword) {
            return res.json({ success: false, message: "Password is wrong" })
        }

        user.email = updateemail;
        await user.save({ validateBeforeSave: false });

        res.json({ success: true, message: "Email updated successfully" })
    } catch (error) {
        console.log(error);
    }
}

const changePassword = async (req, res) => {
    const { password, updatepassword } = req.body;

    if (!req.user) {
        return res.json({ success: false, message: "Please login again" });
    }

    console.log(req.user);
    const oldPassword = await req.user.password;
    const isMatch = await bcrypt.compare(password, oldPassword);
    if (!isMatch) {
        return res.json({ success: false, message: "Wrong password" })
    }

    if (password === updatepassword) {
        return res.json({ success: false, message: "Old and new password are same" })
    }

    if (password.length < 8) {
        return res.json({ success: false, message: "Please enter a strong password" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updatepassword, salt);
    await userModel.updateOne({ email: req.user.email }, { $set: { password: hashedPassword } });

    res.json({ success: true, message: "Password updated successfully" });
}

const changePhn = async (req, res) => {
    const { email, password, updatephn } = req.body;

    const checkemail = await userModel.findOne({ email });

    if (!checkemail) {
        return res.json({ success: false, message: "Email not found" })
    }

    const isMatch = await bcrypt.compare(password, checkemail.password);
    if (!isMatch) {
        return res.json({ success: false, message: "Wrong password" })
    }

    await userModel.updateOne({ email }, { $set: { phonenumber: updatephn } })
    res.json({ success: true, message: "Phone number updated successfully" })
}

const checkCoupon = async (req, res) => {
    try {
        const data = await userModel.findById(req.user._id);

        if (data.usecoupon) {
            return res.json({ success: false, message: "You already use this coupon code" });
        }

        await userModel.updateMany({ email: data.email }, { $set: { usecoupon: true } });
        res.json({ success: true, message: "Coupon code added" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
}

const checkCouponadded = async (req, res) => {
    const { token } = req.body;

    try {
        const data = await findUser(token);

        if (data.usecoupon) {
            await userModel.updateOne({ email: data.email }, { $set: { couponAlreadyAdded: true } });
            return res.json({ success: true, message: "This is run" });
        } else {
            return res.json({ success: false, message: "This is not run" });
        }
    } catch (error) {
        console.log(error);
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.user._id });

        if (!orders) {
            return res.json({ success: false, message: "Please login to see the your orders" });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const cancelOrder = asyncHandler(async (req, res) => {
    // get the orderId from the user
    // check the order is exists or not
    // if yes then check the userid and loggedIn user id
    // if match then cancel the order
    const { orderId } = req.body;

    const order = await orderModel.findByIdAndDelete(orderId);
    if (!order) {
        return res.json({ success: false, message: "Order not round" });
    }

    return res.json({ success: true, message: "Order delted successfully" });
})

export {
    loginUser,
    registerUser,
    logoutUser,
    adminLogin,
    showData,
    changeUsername,
    changeEmail,
    changePassword,
    changePhn,
    checkCoupon,
    checkCouponadded,
    allOrders,
    cancelOrder
}