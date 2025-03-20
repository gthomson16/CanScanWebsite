"use client";

import FeatureCard from './FeatureCard';
import Image from 'next/image';

const features = [
  {
    title: 'Barcode Scanning',
    description: 'Instantly scan product barcodes to identify Canadian-made products and learn more about their origin.',
    icon: (
      <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
    image: '/images/barcode-scan.svg'
  },
  {
    title: 'Image Recognition',
    description: "Take photos of products without barcodes and let our AI identify if it's made in Canada.",
    icon: (
      <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    image: '/images/image-recognition.svg'
  },
  {
    title: 'Local Business Finder',
    description: 'Discover nearby stores that sell Canadian products with our integrated map feature.',
    icon: (
      <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    image: '/images/store-finder.svg'
  },
  {
    title: 'Product Database',
    description: 'Access our extensive database of Canadian products to make informed shopping decisions.',
    icon: (
      <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    image: '/images/phone-mockup.svg'
  },
];

const FeatureSection = () => {
  return (
    <div className="parallax-container parallax-features">
      <div className="container mx-auto px-4 relative z-10 parallax-content">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-red-100 text-canada-red rounded-full font-semibold text-sm mb-4">
            Powerful Features
          </span>
          <h2 className="section-heading">How CanScan Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the powerful features that make CanScan the essential companion for Canadians looking to support local products.
          </p>
        </div>
        
        {/* Feature cards in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
        
        {/* Featured demo sections */}
        <div className="space-y-24">
          {/* Barcode scanning feature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block text-canada-red mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Fast & Accurate Barcode Scanning</h3>
              <p className="text-gray-700 mb-6">
                Our barcode scanning technology quickly identifies Canadian products with just a simple scan. Get instant information about:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Country and province of origin</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Company information and manufacturing details</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Canadian certification and quality standards</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Similar Canadian alternatives for imported products</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gray-50 rounded-3xl p-6 shadow-lg transform hover:rotate-2 transition-transform duration-300">
              <div className="relative h-80 w-full">
                <Image 
                  src="/images/barcode-scan.svg" 
                  alt="Barcode scanning feature" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
          
          {/* Image recognition feature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-50 rounded-3xl p-6 shadow-lg transform hover:rotate-2 transition-transform duration-300">
              <div className="relative h-80 w-full">
                <Image 
                  src="/images/image-recognition.svg" 
                  alt="Image recognition feature" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div>
              <div className="inline-block text-canada-red mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Advanced Image Recognition</h3>
              <p className="text-gray-700 mb-6">
                For products without barcodes or when shopping online, our image recognition technology can:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Identify products from a simple photo</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Detect "Made in Canada" labels and symbols</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Recognize packaging that indicates Canadian origin</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Work with screenshots from online shopping sites</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;