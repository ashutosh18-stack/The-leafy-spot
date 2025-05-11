import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './Navbar.css';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const location = useLocation(); // Get current page URL
  const [isHome, setIsHome] = useState(location.pathname === '/');
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll position

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Apply blur effect after 50px scroll
      } else {
        setIsScrolled(false); // Remove blur effect
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener
    };
  }, []);

  useEffect(() => {
    setIsHome(location.pathname === '/'); // Update state on route change
  }, [location.pathname]);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome && isScrolled
          ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-md' // Blurry effect on scroll (home page)
          : isHome
          ? 'bg-transparent' // Transparent background (home page, no scroll)
          : 'bg-white shadow-md' // Default background (other pages)
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between py-4">
        {/* Left - Logo */}
        <Link to="/" className="logo-animation">
          <img src={assets.logo} className="w-40" alt="Logo" />
        </Link>

        {/* Center - Navigation Links */}
        <ul className={`hidden md:flex gap-8 font-medium ${
          isHome && !isScrolled ? 'text-black' : 'text-gray-700' // Change text color based on scroll
        }`}>
          {['/', '/plants', '/about', '/contact'].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className="relative group flex flex-col items-center text-sm nav-link"
            >
              <p>{path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}</p>
              <span
                className={`absolute bottom-0 w-0 h-[2px] ${
                  isHome && !isScrolled ? 'bg-black' : 'bg-gray-700' // Change underline color based on scroll
                } transition-all duration-300 group-hover:w-full`}
              ></span>
            </NavLink>
          ))}
        </ul>

        {/* Right - Icons Section */}
        <div className="flex items-center gap-6">
          <img
            onClick={() => {
              setShowSearch(true);
              navigate('/plants');
            }}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />

          {/* Profile Icon & Dropdown */}
          <div className="relative group">
            <img
              onClick={() => (token ? null : navigate('/login'))}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
            />
            {token && (
              <div className="hidden group-hover:block absolute right-0 mt-0 w-40 bg-white shadow-lg rounded-md">
                <ul className="py-2 text-gray-600">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Profile</li>
                  <li onClick={() => navigate('/orders')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Orders
                  </li>
                  <li onClick={logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5" alt="Cart" />
            <span className="absolute -right-2 -bottom-2 bg-black text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-6 cursor-pointer md:hidden"
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white transition-transform transform ${
          visible ? 'translate-x-0' : 'translate-x-full'
        } w-64 shadow-lg z-50`}
      >
        <div className="flex flex-col text-gray-700">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-4 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Close" />
            <p>Back</p>
          </div>
          {['/', '/collection', '/about', '/contact'].map((path, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className="py-3 px-6 border-b text-gray-700"
              to={path}
            >
              {path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;