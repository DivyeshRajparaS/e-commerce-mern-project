import { v2 as cloudinary } from "cloudinary"
import orderModel from "../models/orderModel.js"
import productModel from "../models/productModel.js"
import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller, stock } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
            stock: stock
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const Alluser = async (req, res) => {
    try {
        const products = await userModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const userCount = async (req, res) => {
    try {
        const count = await userModel.countDocuments();
        res.json({ success: true, count });
    } catch (error) {
        res.json({ process: false, message: error })
    }
}

const productCount = async (req, res) => {
    try {
        const count = await productModel.countDocuments();
        res.json({ success: true, count });
    } catch (error) {
        res.json({ process: false, message: error })
    }
}

const orderCount = async (req, res) => {
    try {
        const count = await orderModel.countDocuments();
        res.json({ success: true, count });
    } catch (error) {
        res.json({ process: false, message: error })
    }
}

const changeProductDetails = asyncHandler(async (req, res) => {
    const { id, name, category, price } = req.body;

    if (!id) {
        return res.status(200).json({ success: false, message: "Id cannot get" });
    }

    if ([name, category, price].some((field) => field === "")) {
        return res.json({ success: false, message: "All fields are required" });
    }

    const product = await productModel.findById({ _id: id });
    if (!product) {
        console.log(id);
        return res.status(200).json({ success: false, message: "Product not found" });
    }

    product.name = name;
    product.category = category;
    product.price = price;
    await product.save();

    return res.status(200).json({ success: true, message: "Product details updated successfully" });
})

const updateUserDetails = asyncHandler(async (req, res) => {
    const { userId, name, email, phonenumber } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }

    if ([name, email, phonenumber].some((field) => field === "")) {
        throw new ApiError(400, "All fields are required!!");
    }

    const checkUsername = await userModel.findOne({ name, _id: { $ne: userId } });
    if (checkUsername) {
        return res.json({ success: false, message: "Username already exists" });
    }

    const checkEmail = await userModel.findOne({ email, _id: { $ne: userId } });
    if (checkEmail) {
        return res.json({ success: false, message: "Email already exists" });
    }

    user.name = name;
    user.email = email;
    user.phonenumber = phonenumber;
    await user.save();

    return res.json({ success: true, message: "User details updated successfully" });
})

const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.json({ success: false, message: "Login again or userId is not get" });
    }

    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, message: "User deleted successfully" });
})

export {
    listProducts,
    addProduct,
    changeProductDetails,
    removeProduct,
    singleProduct,
    Alluser, userCount,
    productCount,
    orderCount,
    updateUserDetails,
    deleteUser
}