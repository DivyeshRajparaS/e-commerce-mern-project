import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AnotherOrders from './pages/AnotherOrders';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import Emailsupport from './pages/Emailsupport';
import Profile from './pages/Profile';
import Updateuser from './pages/Updateuser';
import Reviews from './pages/Reviews';
import NotFound from './pages/NotFound';

const App = () => {
  const location = useLocation();

  return (
    // <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-slate-900">
    //   <ToastContainer />
    //   <Navbar />
    //   <SearchBar />

    //   <AnimatePresence>
    //     <Routes location={location} key={location.pathname}>
    //       <Route
    //         path="/"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, x: 100 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             exit={{ opacity: 0, x: -100 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Home />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/collection"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, x: 100 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             exit={{ opacity: 0, x: -100 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Collection />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/about"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, scale: 0.9 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             exit={{ opacity: 0, scale: 1.1 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <About />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/contact"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, y: 50 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -50 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Contact />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/product/:productId"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, scale: 0.9 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             exit={{ opacity: 0, scale: 1.1 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Product />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/cart"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, y: 50 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -50 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Cart />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/login"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, y: 50 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -50 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Login />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/place-order"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, x: 100 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             exit={{ opacity: 0, x: -100 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <PlaceOrder />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/orders"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, scale: 0.9 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             exit={{ opacity: 0, scale: 1.1 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Orders />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/verify"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, x: 100 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             exit={{ opacity: 0, x: -100 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Verify />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/emailsupport"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, scale: 0.9 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             exit={{ opacity: 0, scale: 1.1 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Emailsupport />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/profile"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, y: 50 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -50 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Profile />
    //           </motion.div>
    //         }
    //       />
    //       <Route
    //         path="/profile/updateuser/:updatefor"
    //         element={
    //           <motion.div
    //             initial={{ opacity: 0, scale: 0.9 }}
    //             animate={{ opacity: 1, scale: 1 }}
    //             exit={{ opacity: 0, scale: 1.1 }}
    //             transition={{ duration: 0.5, ease: 'easeIn' }}
    //           >
    //             <Updateuser />
    //           </motion.div>
    //         }
    //       />
    //     </Routes>
    //   </AnimatePresence>

    //   <Footer />
    // </div>
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-slate-900">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/product/reviews/:productId" element={<Reviews />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/anotherOrders" element={< AnotherOrders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/emailsupport" element={<Emailsupport />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/updateuser/:updatefor" element={<Updateuser />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;