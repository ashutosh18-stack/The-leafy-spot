import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Plants = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };



  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

   

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-20 border-t px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Indoor'}
                onChange={toggleCategory}
              />{' '}
              Indoor
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Outdoor'}
                onChange={toggleCategory}
              />{' '}
              Outdoor
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Flowering'}
                onChange={toggleCategory}
              />{' '}
           Flowering Plants
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Season'}
                onChange={toggleCategory}
              />{' '}
              Season
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Hanging'}
                onChange={toggleCategory}
              />{' '}
              Hanging plants
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Air'}
                onChange={toggleCategory}
              />{' '}
              Air purifying plants
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'pet'}
                onChange={toggleCategory}
              />{' '}
              Pet safe House Plants
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Small'}
                onChange={toggleCategory}
              />{' '}
              Small House Plants
            </p>
          </div>
        </div>
       
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>OTHER</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Tools'}
                onChange={toggleCategory}
              />{' '}
      Gardening Tools
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'SNF'}
                onChange={toggleCategory}
              />{' '}
           Soil and Fertilizers
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Planters'}
                onChange={toggleCategory}
              />{' '}
          Planters
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Seeds'}
                onChange={toggleCategory}
              />{' '}
              Seeds
            </p>
           
          </div>
        </div>
      </div>


      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
        </div>

        {/* Map Products */}
        {filterProducts.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
  <p className="text-center text-lg text-gray-600 mt-10">
    No products found for the selected category.
  </p>
)}
      </div>
    </div>
  );
};

export default Plants;