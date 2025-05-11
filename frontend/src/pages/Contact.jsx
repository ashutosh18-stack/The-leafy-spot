import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-20'>
      {/* Title Section */}
      <div className='text-center text-2xl border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Content Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        {/* Contact Image */}
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Us" />
        
        {/* Contact Details */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
         416012 Kolhapur,Maharashtra<br />
          </p>
          <p className='text-gray-500'>
            Tel: +91 8217568486 <br />
            Email: theleafyspot@gmail.com
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;