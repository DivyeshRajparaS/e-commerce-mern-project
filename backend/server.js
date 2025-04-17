import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import session from 'express-session'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import reviewRouter from "./routes/reviewRoute.js";
import userUpdate from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import cookieParser from 'cookie-parser'

// App Config
const app = express();
app.use(cookieParser());
const port = process.env.PORT || 4000;
connectDB()
    .then(() => {
        console.log('Mongodb Connected');
    })
    .catch((error) => {
        console.log(error);
    })
connectCloudinary();
app.use(session({ secret: 'ysecret', resave: false, saveUninitialized: true }));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOriginls = [
    "https://e-commerce-device-store.vercel.app",
    "https://e-commerce-electronic-admin.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
]
app.use(cors({
    origin: allowedOriginls,
    credentials: true
}));

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/userupdate', userUpdate)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/review', reviewRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => console.log('Server started on PORT : ' + port))