"use client";

import FeatureCard from './FeatureCard';
import { useTranslations } from 'next-intl';
import DetailedFeature from './DetailedFeature'; // Import the new component

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
const aiInsightsIcon = (
  <svg className="w-10 h-10 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const historyIcon = (
   <svg className="w-10 h-10 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
); // Semicolon included


const FeatureSection = () => {
  const t = useTranslations('FeatureSection');

  const featureCards = [
    { titleKey: 'feature1Title', descKey: 'feature1Desc', icon: barcodeIcon },
    { titleKey: 'feature2Title', descKey: 'feature2Desc', icon: imageRecIcon },
    { titleKey: 'feature3Title', descKey: 'feature3Desc', icon: mapIcon },
    { titleKey: 'feature4Title', descKey: 'feature4Desc', icon: databaseIcon },
  ];

  return (
    <div className="features-section py-24 relative z-30 bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-25"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="inline-block px-4 py-2 bg-red-100 text-red-900 rounded-full font-semibold text-sm mb-6"> {/* Changed text-canada-red to text-red-900 for contrast */}
            {t('tagline')}
          </span>
          <h2 className="section-heading mb-6">{t('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
          {featureCards.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={t(feature.titleKey)} 
              description={t(feature.descKey)} 
              icon={feature.icon}
            />
          ))}
        </div>
        
        <div className="space-y-32 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <DetailedFeature
              icon={imageRecIcon}
              title={t('imageRecTitle')}
              description={t('imageRecDesc')}
              listItems={[
                t('imageRecItem1'),
                t('imageRecItem2'),
                t('imageRecItem3'),
                t('imageRecItem4'),
              ]}
              imageSrc="/images/screens/ai_image.jpg"
              imageAlt={t('imageRecTitle')}
              imagePosition="right" 
            />
            <DetailedFeature
              icon={aiInsightsIcon}
              title={t('aiInsightsTitle')}
              description={t('aiInsightsDesc')}
              listItems={[
                t('aiInsightsItem1'),
                t('aiInsightsItem2'),
                t('aiInsightsItem3'),
                t('aiInsightsItem4'),
              ]}
              imageSrc="/images/screens/ai_insights.jpg"
              imageAlt={t('aiInsightsTitle')}
              imagePosition="right" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <DetailedFeature
              icon={barcodeIcon}
              title={t('barcodeScanTitle')}
              description={t('barcodeScanDesc')}
              listItems={[
                t('barcodeScanItem1'),
                t('barcodeScanItem2'),
                t('barcodeScanItem3'),
                t('barcodeScanItem4'),
              ]}
              imageSrc="/images/screens/barcode.jpg"
              imageAlt={t('barcodeScanTitle')}
              imagePosition="left" 
            />
            <DetailedFeature
              icon={historyIcon}
              title={t('scanHistoryTitle')}
              description={t('scanHistoryDesc')}
              listItems={[
                t('scanHistoryItem1'),
                t('scanHistoryItem2'),
                t('scanHistoryItem3'),
                t('scanHistoryItem4'),
              ]}
              imageSrc="/images/screens/history.jpg"
              imageAlt={t('scanHistoryTitle')}
              imagePosition="left" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
