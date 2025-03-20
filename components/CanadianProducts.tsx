"use client";

import { useState } from 'react';
import Image from 'next/image';

const productCategories = [
  'Food & Beverage',
  'Home Goods',
  'Fashion',
  'Technology',
  'Beauty & Health',
];

// Mock product data with actual images
const products = [
  {
    name: 'Maple Syrup',
    description: 'Pure maple syrup from Quebec forests. A sweet Canadian tradition.',
    category: 'Food & Beverage',
    image: '/images/maple-syrup.svg',
  },
  {
    name: 'Artisan Cheese',
    description: 'Award-winning Canadian artisan cheese made from local dairy.',
    category: 'Food & Beverage',
    image: '/images/maple-syrup.svg', // Using placeholder until we create more images
  },
  {
    name: 'Wool Blanket',
    description: 'Handcrafted wool blanket from Canadian wool. Perfect for cold winter nights.',
    category: 'Home Goods',
    image: '/images/maple-syrup.svg', // Using placeholder until we create more images
  },
  {
    name: 'Winter Jacket',
    description: 'Designed for harsh Canadian winters. Waterproof, windproof, and very warm.',
    category: 'Fashion',
    image: '/images/winter-jacket.svg',
  },
  {
    name: 'Smartphone App',
    description: 'Developed by Canadian software engineers to help you in daily life.',
    category: 'Technology',
    image: '/images/phone-mockup.svg', // Using our phone mockup
  },
  {
    name: 'Natural Skincare',
    description: 'Made with Canadian botanicals harvested from pristine natural environments.',
    category: 'Beauty & Health',
    image: '/images/maple-syrup.svg', // Using placeholder until we create more images
  },
];

const CanadianProducts = () => {
  const [activeCategory, setActiveCategory] = useState('Food & Beverage');
  
  const filteredProducts = products.filter(product => product.category === activeCategory);
  
  return (
    <div className="parallax-container parallax-products">
      <div className="container mx-auto px-4 relative z-10 parallax-content">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-red-100 text-canada-red rounded-full font-semibold text-sm mb-4">
            Discover Canadian Excellence
          </span>
          <h2 className="section-heading">Canadian Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore a variety of high-quality products made in Canada that you can identify using CanScan.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {productCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition shadow ${
                activeCategory === category
                  ? 'bg-canada-red text-white font-bold'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={index} className="card overflow-hidden flex flex-col transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="bg-gray-100 h-48 relative">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="p-4"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <span className="text-sm px-2 py-1 bg-red-100 text-canada-red rounded-full">New</span>
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="px-6 pb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-2">
                    <svg viewBox="0 0 512 512" fill="currentColor" className="text-canada-red">
                      <path d="M256,0c-23.357,0-42.297,18.932-42.297,42.288c0,13.928,6.726,26.264,17.151,33.963
                      c-10.24,12.777-26.569,21.489-26.569,21.489s20.075-0.908,30.911-3.024c-7.523,12.304-24.333,26.233-24.333,26.233
                      s19.339-3.75,32.499-13.716c-9.889,31.974-34.542,40.623-34.542,40.623s23.535,5.094,43.083-9.343
                      c-8.156,21.051-33.971,35.223-33.971,35.223s21.479-1.26,46.815-19.057c7.068,29.653-16.304,60.369-16.304,60.369
                      s37.073-15.38,47.446-61.123c4.056,8.48,28.236,18.395,28.236,18.395s-15.659-21.823-18.417-31.863
                      c13.891,10.814,40.173,16.52,40.173,16.52s-31.968-26.02-35.906-39.185c13.829,5.46,39.155,6.787,39.155,6.787
                      s-28.785-20.012-33.952-30.44c23.389,5.414,57.274-0.463,57.274-0.463s-59.873-10.183-64.693-24.354
                      c19.293,0.312,34.218-6.318,34.218-6.318s-24.427-5.779-33.187-13.341c10.424-7.699,17.151-20.035,17.151-33.963
                      C298.297,18.932,279.357,0,256,0z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Made in Canada</span>
                </div>
                <button className="text-canada-red font-medium hover:underline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CanadianProducts;