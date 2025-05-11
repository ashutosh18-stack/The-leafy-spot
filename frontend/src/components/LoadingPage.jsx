// src/components/LoadingPage.js
import React, { useEffect, useState } from 'react';
import './LoadingPage.css'; // Import the CSS for the loading page

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading time (e.g., 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div> {/* Simple spinner */}
        </div>
      ) : (
        <div className="content">
          {/* Your main content goes here */}
          <h1>Welcome to The Leafy Spot!</h1>
        </div>
      )}
    </>
  );
};

export default LoadingPage;
