import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, Alluser, userCount, productCount, orderCount, changeProductDetails, updateUserDetails, deleteUser } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts)
productRouter.get('/alluserdata', Alluser)
productRouter.get('/usercount', userCount)
productRouter.get('/productcount', productCount)
productRouter.get('/ordercount', orderCount)
productRouter.post('/updateProductDetails', changeProductDetails);
productRouter.post('/changeuserdetails', adminAuth, updateUserDetails);
productRouter.post('/deleteuser', adminAuth, deleteUser);

export default productRouter;