import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Plants from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import InvoicePage from './pages/InvoicePage'; // Import the new Invoice Page
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import LoadingPage from './components/LoadingPage'; // Import the LoadingPage component

const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading time of 3 seconds before showing the website content
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div>
      <ToastContainer />
      {/* Show loading page while loading */}
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <SearchBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/plants' element={<Plants />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/invoice/:orderId' element={<InvoicePage />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
