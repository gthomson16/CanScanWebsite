"use client";

import FeatureCard from './FeatureCard';
import Image from 'next/image';
import { useTranslations } from 'next-intl'; // Import useTranslations

// Define icons separately for clarity
const barcodeIcon = (
  <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);
const imageRecIcon = (
  <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const mapIcon = (
  <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const databaseIcon = (
  <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const FeatureSection = () => {
  const t = useTranslations('FeatureSection'); // Get translations

  // Build features array using translations
  const features = [
    { title: t('feature1Title'), description: t('feature1Desc'), icon: barcodeIcon, image: '/images/screens/barcode.jpg' },
    { title: t('feature2Title'), description: t('feature2Desc'), icon: imageRecIcon, image: '/images/screens/ai_image.jpg' },
    { title: t('feature3Title'), description: t('feature3Desc'), icon: mapIcon, image: '/images/store-finder.svg' },
    { title: t('feature4Title'), description: t('feature4Desc'), icon: databaseIcon, image: '/images/screens/bilingual.jpg' },
  ];

  return (
    <section className="features-section py-24 relative z-30 bg-transparent" aria-labelledby="feature-section-heading"> {/* Changed div to section and added aria-labelledby */}
      {/* Local overlay with lower opacity to let background show through more */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-25"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="inline-block px-4 py-2 bg-red-100 text-canada-red rounded-full font-semibold text-sm mb-6">
            {t('tagline')}
          </span>
          <h2 id="feature-section-heading" className="section-heading mb-6">{t('title')}</h2> {/* Added id */}
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        {/* Feature cards in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title} // Already translated
              description={feature.description} // Already translated
              icon={feature.icon}
            />
          ))}
        </div>
        
        {/* Featured demo sections */}
        <div className="space-y-48 mb-16"> {/* Increased vertical space further */}
          {/* First row - two sections side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image recognition feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block text-canada-red mb-4">
                  {imageRecIcon} {/* Use icon variable */}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('imageRecTitle')}</h3>
                <p className="text-gray-700 mb-6">
                  {t('imageRecDesc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('imageRecItem1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('imageRecItem2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('imageRecItem3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('imageRecItem4')}</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-blue-50 blur-xl opacity-40"></div>
                    <div className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[5deg] transform-gpu">
                      <Image 
                        src="/images/screens/ai_image.jpg" 
                        alt="Image recognition feature" 
                        width={240}
                        height={480}
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Generated Insights feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block text-canada-red mb-4">
                  {/* Assuming an icon for AI insights - replace if needed */}
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('aiInsightsTitle')}</h3>
                <p className="text-gray-700 mb-6">
                  {t('aiInsightsDesc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('aiInsightsItem1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('aiInsightsItem2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('aiInsightsItem3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('aiInsightsItem4')}</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-blue-50 blur-xl opacity-40"></div>
                    <div className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[5deg] transform-gpu">
                      <Image 
                        src="/images/screens/ai_insights.jpg" 
                        alt="AI Generated Insights feature" 
                        width={240}
                        height={480}
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second row - two sections side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Barcode scanning feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Updated structure to match top images */}
              <div className="order-2 md:order-1 relative">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-blue-50 blur-xl opacity-40"></div>
                    <div className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[5deg] transform-gpu">
                      <Image 
                        src="/images/screens/barcode.jpg" 
                        alt="Barcode scanning feature" 
                  width={240}
                  height={480}
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
              <div className="inline-block text-canada-red mb-4">
                {barcodeIcon} {/* Use icon variable */}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('barcodeScanTitle')}</h3>
              <p className="text-gray-700 mb-6">
                {t('barcodeScanDesc')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('barcodeScanItem1')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('barcodeScanItem2')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('barcodeScanItem3')}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('barcodeScanItem4')}</span>
                </li>
              </ul>
            </div>
          </div>
          
            {/* Scan History feature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               {/* Updated structure to match top images */}
              <div className="order-2 md:order-1 relative">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-blue-50 blur-xl opacity-40"></div>
                    <div className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[5deg] transform-gpu">
                      <Image 
                        src="/images/screens/history.jpg" 
                        alt="Scan History feature" 
                        width={240}
                        height={480}
                        className=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block text-canada-red mb-4">
                  {/* Assuming an icon for history - replace if needed */}
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('scanHistoryTitle')}</h3>
                <p className="text-gray-700 mb-6">
                  {t('scanHistoryDesc')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('scanHistoryItem1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('scanHistoryItem2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('scanHistoryItem3')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t('scanHistoryItem4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> // Changed div to section
  );
};

export default FeatureSection;
