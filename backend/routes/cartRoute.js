import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import { verifyJWT } from '../middleware/userAuth.js'

const cartRouter = express.Router()

cartRouter.post('/get', verifyJWT, getUserCart)
cartRouter.post('/add', verifyJWT, addToCart)
cartRouter.post('/update', verifyJWT, updateCart)

export default cartRouter;