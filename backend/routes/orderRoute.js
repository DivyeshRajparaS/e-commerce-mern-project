import express from 'express'
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, calcelOrder } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { verifyJWT } from '../middleware/userAuth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)
orderRouter.post('/calcelorder', adminAuth, calcelOrder)

// Payment Features
orderRouter.post('/place', verifyJWT, placeOrder)
orderRouter.post('/stripe', verifyJWT, placeOrderStripe)
// orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders', verifyJWT, userOrders)

// verify payment
orderRouter.post('/verifyStripe', verifyJWT, verifyStripe)
// orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter;