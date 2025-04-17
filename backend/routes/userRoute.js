import express from 'express';;
import { loginUser, registerUser, adminLogin, showData, changeUsername, changeEmail, changePassword, changePhn, checkCoupon, checkCouponadded, logoutUser, allOrders, cancelOrder } from '../controllers/userController.js';
import { verifyJWT } from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/showdata', verifyJWT, showData);
userRouter.post('/updateuser/username', verifyJWT, changeUsername);
userRouter.post('/updateuser/email', verifyJWT, changeEmail);
userRouter.post('/updateuser/password', verifyJWT, changePassword);
userRouter.post('/updateuser/phonenumber', verifyJWT, changePhn);
userRouter.post('/cart/couponcode', verifyJWT, checkCoupon);
userRouter.post('/cart/checkcouponadded', verifyJWT, checkCouponadded);
userRouter.post('/orders', verifyJWT, allOrders);
userRouter.post('/cancelOrder', verifyJWT, cancelOrder);

export default userRouter;