import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-20'>
      {/* Title Section */}
      <div className='text-2xl text-center border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Content Section */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        {/* About Image */}
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Us" />
        
        {/* About Text */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            <b className='text-gray-800'>The Leafy Spot: Growing Your Green Haven</b>
            <br />
            The Leafy Spot was born out of a deep-rooted passion for nature and a vision to transform the gardening experience. Our journey began with a simple idea: to create a platform where plant lovers can effortlessly discover, explore, and bring home a diverse selection of greenery.
            <br /><br />
            Since our inception, we have been committed to curating a wide variety of high-quality collection, gardening tools, and accessories to suit every gardener’s needs. From vibrant flowers and lush indoor collection to organic herbs and essential gardening supplies, The Leafy Spot offers a carefully sourced collection from trusted nurseries and suppliers. Whether you're a seasoned gardener or just starting, we provide everything you need to nurture your green space with ease and joy.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            At The Leafy Spot, our mission is to inspire and empower plant lovers with choice, convenience, and confidence. We are committed to providing a seamless gardening experience, from selecting the perfect collection to nurturing them with the right tools and guidance. Whether you're a beginner or an expert, we strive to make gardening effortless, enjoyable, and rewarding at every step.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default About;