"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl'; // Import useTranslations

const CanadianProducts = () => {
  const t = useTranslations('CanadianProducts'); // Get translations

  // Define categories using translation keys
  const productCategories = [
    { key: 'categoryFood', imageCategory: 'Food & Beverage' },
    { key: 'categoryHome', imageCategory: 'Home Goods' },
    { key: 'categoryFashion', imageCategory: 'Fashion' },
    { key: 'categoryTech', imageCategory: 'Technology' },
    { key: 'categoryBeauty', imageCategory: 'Beauty & Health' },
  ];

  // Mock product data using translation keys
  const products = [
    {
      nameKey: 'productMapleName',
      descKey: 'productMapleDesc',
      category: 'Food & Beverage', // Keep original category for filtering
      image: '/images/maple-syrup.svg',
    },
    {
      nameKey: 'productCheeseName',
      descKey: 'productCheeseDesc',
      category: 'Food & Beverage',
      image: '/images/maple-syrup.svg', // Placeholder
    },
    {
      nameKey: 'productBlanketName',
      descKey: 'productBlanketDesc',
      category: 'Home Goods',
      image: '/images/maple-syrup.svg', // Placeholder
    },
    {
      nameKey: 'productJacketName',
      descKey: 'productJacketDesc',
      category: 'Fashion',
      image: '/images/winter-jacket.svg',
    },
    {
      nameKey: 'productAppName',
      descKey: 'productAppDesc',
      category: 'Technology',
      image: '/images/phone-mockup.svg',
    },
    {
      nameKey: 'productSkincareName',
      descKey: 'productSkincareDesc',
      category: 'Beauty & Health',
      image: '/images/maple-syrup.svg', // Placeholder
    },
  ];

  // Use the English category name for state management
  const [activeCategory, setActiveCategory] = useState('Food & Beverage'); 
  
  const filteredProducts = products.filter(product => product.category === activeCategory);
  
  return (
    <section className="canadian-products-section bg-white py-16 relative z-30" aria-labelledby="canadian-products-heading"> {/* Changed div to section and added aria-labelledby */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-red-100 text-canada-red rounded-full font-semibold text-sm mb-4">
            {t('tagline')}
          </span>
          <h2 id="canadian-products-heading" className="section-heading">{t('title')}</h2> {/* Added id */}
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {productCategories.map((category) => (
            <button
              key={category.key}
              className={`px-4 py-2 rounded-full transition shadow ${
                // Compare with the original English category name used for state
                activeCategory === category.imageCategory 
                  ? 'bg-canada-red text-white font-bold'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              // Set state using the original English category name
              onClick={() => setActiveCategory(category.imageCategory)} 
            >
              {t(category.key)} {/* Display translated category name */}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <article key={index} className="card overflow-hidden flex flex-col transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"> {/* Changed div to article */}
              <div className="bg-white h-48 relative">
                <Image 
                  src={product.image} 
                  alt={t(product.nameKey)} // Use translated name for alt text
                  fill
                  style={{ objectFit: 'contain' }}
                  className="p-4"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{t(product.nameKey)}</h3>
                  <span className="text-sm px-2 py-1 bg-red-100 text-canada-red rounded-full">{t('badgeNew')}</span>
                </div>
                <p className="text-gray-600">{t(product.descKey)}</p>
              </div>
              <div className="px-6 pb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-canada-red">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{t('labelMadeInCanada')}</span>
                </div>
                <button className="text-canada-red font-medium hover:underline">{t('buttonViewDetails')}</button>
              </div>
            </article> // Changed div to article
          ))}
        </div>
      </div>
    </section> // Changed div to section
  );
};

export default CanadianProducts;
