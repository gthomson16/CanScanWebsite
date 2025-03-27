"use client"; // Add this directive

import Link from 'next/link';
import { useTranslations } from 'next-intl'; // Import useTranslations

export default function DownloadPage() {
  const t = useTranslations('DownloadPage'); // Get translations
  const tCTA = useTranslations('DownloadCTA'); // Get translations for buttons

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-canada-dark mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="#" 
                className="bg-black text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center hover:bg-gray-800 transition"
              >
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18m0 0l-7-7m7 7l7-7" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">{tCTA('appStoreLabel')}</div>
                  <div className="text-lg font-bold">{tCTA('appStoreName')}</div>
                </div>
              </Link>
              
              <Link 
                href="#" 
                className="bg-black text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center hover:bg-gray-800 transition"
              >
                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">{tCTA('googlePlayLabel')}</div>
                  <div className="text-lg font-bold">{tCTA('googlePlayName')}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading text-center mb-12">{t('featuresTitle')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{t('feature1Title')}</h3>
                <p className="text-gray-700">
                  {t('feature1Desc')}
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{t('feature2Title')}</h3>
                <p className="text-gray-700">
                  {t('feature2Desc')}
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{t('feature3Title')}</h3>
                <p className="text-gray-700">
                  {t('feature3Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Download Instructions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-center mb-12">{t('installTitle')}</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-canada-red text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('step1Title')}</h3>
                  <p className="text-gray-700">
                    {t('step1Desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-canada-red text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('step2Title')}</h3>
                  <p className="text-gray-700">
                    {t('step2Desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-canada-red text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('step3Title')}</h3>
                  <p className="text-gray-700">
                    {t('step3Desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-canada-red text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('step4Title')}</h3>
                  <p className="text-gray-700">
                    {t('step4Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
