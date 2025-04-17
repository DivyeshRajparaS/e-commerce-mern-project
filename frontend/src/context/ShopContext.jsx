import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const couponcode = "get10extra"
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();
    const [thememode, setThememode] = useState('light');
    const darkmode = () => {
        setThememode("dark");
        localStorage.setItem("theme", JSON.stringify("dark"))
    }
    const [userupdate, setUserupdate] = useState(true);
    const [emailupdate, setEmailupdate] = useState(false);
    const [passwordupdate, setPasswordupdate] = useState(false);
    const [phnupdate, setPhnupdate] = useState(false);
    const [couponadded, setCouponadded] = useState(false);

    const lightmode = () => {
        setThememode("light");
        localStorage.setItem("theme", JSON.stringify("light"))
    }

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { withCredentials: true })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log('Error in getcartcount:-' + error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { withCredentials: true });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = (addcouponTocart = false) => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);

            if (!itemInfo) continue;

            for (const size in cartItems[itemId]) {
                try {
                    if (cartItems[itemId][size] > 0) {
                        totalAmount += itemInfo.price * cartItems[itemId][size];
                    }
                } catch (error) {
                    console.error("Error calculating cart total:", error);
                }
            }
        }

        if (addcouponTocart) {
            totalAmount -= totalAmount * 0.1;
        }

        return totalAmount;
    };


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list', { withCredentials: true })
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {

            const response = await axios.post(backendUrl + '/api/cart/get', {}, { withCredentials: true })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
        if (token) {
            getUserCart(token)
        }
    }, [token])

    useEffect(() => {
        document.querySelector("html").classList.remove("dark", "light");
        const previousTheme = JSON.parse(localStorage.getItem("theme"));
        setThememode(previousTheme);
        document.querySelector("html").classList.add(thememode);
    }, [thememode])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, thememode, darkmode, lightmode,
        userupdate, setUserupdate,
        emailupdate, setEmailupdate,
        passwordupdate, setPasswordupdate,
        phnupdate, setPhnupdate, couponcode,
        couponadded, setCouponadded
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;