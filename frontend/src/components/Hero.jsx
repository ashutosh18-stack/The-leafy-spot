import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import './Hero.css';

const Hero = () => {
  const [inView, setInView] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);  // Trigger animation when in view
        }
      },
      { threshold: 0.5 }  // Trigger when 50% of the element is in view
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className='flex flex-col sm:flex-row border border-400 rounded-lg overflow-hidden max-w-3xl mx-auto mt-8 sm:mt-12'
    >
      {/* Hero Left Side (Image) */}
      <img
        className={`hero-img w-full sm:w-1/2 object-cover h-48 sm:h-64 ${inView ? 'animate-slideInLeft' : ''}`}
        src={assets.hero_img}
        alt="Hero"
      />
      
      {/* Hero Right Side (Text) */}
      <div
        className={`hero-text w-full sm:w-1/2 flex items-center justify-center py-4 sm:py-2 ${inView ? 'animate-slideInRight' : ''}`}
      >
        <div className='text-[#414141] text-center sm:text-left'>
          <div className='flex items-center gap-2 justify-center sm:justify-start'>
            <p className='w-6 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-xs md:text-sm'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-xl sm:py-1 lg:text-3xl leading-tight'>Latest Arrivals</h1>
          <div className='flex items-center gap-2 justify-center sm:justify-start'>
            <p className='font-semibold text-xs md:text-sm'>SHOP NOW</p>
            <p className='w-6 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
