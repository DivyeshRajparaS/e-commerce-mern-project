import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

const currency = 'INR'
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// })

const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        console.log(req.user._id);

        const orderData = {
            userId: req.user._id,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: true,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(req.user._id, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body;
        const { origin } = req.headers;

        let totalPrice = 0;
        let discountedTotal = 0;
        const deliveryCharge = 10;

        const user = await userModel.findById({ _id: req.user._id });
        console.log(user);
        const hasDiscount = user?.usecoupon && !user?.couponAlreadyAdded;

        const line_items = items.map((item) => {
            let itemPrice = item.price;
            if (hasDiscount) {
                itemPrice = itemPrice * 0.9;
            }
            totalPrice += item.price * item.quantity;
            discountedTotal += itemPrice * item.quantity;

            return {
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(itemPrice * 100),
                },
                quantity: item.quantity,
            };
        });

        line_items.push({
            price_data: {
                currency: "INR",
                product_data: { name: "Delivery Charges" },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        const finalAmount = discountedTotal + deliveryCharge;

        const orderData = {
            userId: req.user._id,
            items,
            address,
            amount: finalAmount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        res.json({ success: true, session_url: session.url, discountApplied: hasDiscount });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using Razorpay Method
// const placeOrderRazorpay = async (req, res) => {
//     try {

//         const { userId, items, amount, address } = req.body

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "Razorpay",
//             payment: false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const options = {
//             amount: amount * 100,
//             currency: currency.toUpperCase(),
//             receipt: newOrder._id.toString()
//         }

//         await razorpayInstance.orders.create(options, (error, order) => {
//             if (error) {
//                 console.log(error)
//                 return res.json({ success: false, message: error })
//             }
//             res.json({ success: true, order })
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// const verifyRazorpay = async (req, res) => {
// try {

//     const { userId, razorpay_order_id } = req.body

//     const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//     if (orderInfo.status === 'paid') {
//         await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
//         await userModel.findByIdAndUpdate(userId, { cartData: {} })
//         res.json({ success: true, message: "Payment Successful" })
//     } else {
//         res.json({ success: false, message: 'Payment Failed' });
//     }

// } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
// }
// }

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User Order Data For Forntend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const calcelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const checkOrder = await orderModel.findByIdAndDelete(orderId);

        if (!checkOrder) {
            return res.json({ success: false, message: "The order is not found" })
        }

        return res.json({ success: true, message: "The order calceled" })
    } catch (error) {
        console.log(error);
    }
}

export {
    verifyStripe,
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    calcelOrder
}