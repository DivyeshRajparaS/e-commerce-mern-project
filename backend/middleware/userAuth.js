import userModel from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const { accessToken } = req?.cookies;

    if (!accessToken) {
        req.user = null; // Allow unauthenticated access for certain routes
        return next();
    }

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await userModel.findById(decodedToken._id).select("-refreshToken");

        if (!user) {
            return res.status(401).json({ status: false, message: "Invalid access token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: "Invalid access token" });
    }
});

export { verifyJWT };
