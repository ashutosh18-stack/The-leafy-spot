import React, { useEffect } from 'react';
import './Home.css';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';

const Home = () => {
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    const elements = document.querySelectorAll(".scroll-animation");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div>
      <div className="home-container">
        <div className="home-image">
          <div className="blurry-card">
            <h1 className="text">Welcome to Leafy Spot</h1>
            <p className="description">Discover the best plants and gardening products!</p>
          </div>
        </div>
      </div>

      {/* Applying Scroll Animation */}
      <div className="scroll-animation"><Hero /></div>
      <div className="scroll-animation"><LatestCollection /></div>
      <div className="scroll-animation"><BestSeller /></div>
      <div className="scroll-animation"><OurPolicy /></div>
      <div className="scroll-animation"><NewsletterBox /></div>
    </div>
  );
};

export default Home;
