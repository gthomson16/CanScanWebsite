"use client"; // Add this directive

import { useTranslations } from 'next-intl'; // Import useTranslations

export default function FeaturesPage() {
  const t = useTranslations('FeaturesPage'); // Get translations

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-canada-red to-red-700 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-white text-opacity-90">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="inline-block text-canada-red mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">{t('barcodeTitle')}</h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('barcodeDesc')}
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('barcodeItem1')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('barcodeItem2')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('barcodeItem3')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('barcodeItem4')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-white h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Barcode Scanning Demo Image</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 md:order-1 bg-white h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image Recognition Demo Image</span>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block text-canada-red mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">{t('imageRecTitle')}</h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('imageRecDesc')}
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('imageRecItem1')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('imageRecItem2')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('imageRecItem3')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('imageRecItem4')}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-canada-red mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">{t('mapTitle')}</h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('mapDesc')}
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('mapItem1')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('mapItem2')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('mapItem3')}</span>
                </li>
                <li className="flex">
                  <svg className="w-6 h-6 mr-2 text-canada-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('mapItem4')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-white h-80 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Local Business Finder Demo Image</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Features */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mb-12">{t('moreFeaturesTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-canada-red mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('databaseTitle')}</h3>
              <p className="text-gray-700">
                {t('databaseDesc')}
              </p>
            </div>
            
            <div className="card">
              <div className="text-canada-red mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('favoritesTitle')}</h3>
              <p className="text-gray-700">
                {t('favoritesDesc')}
              </p>
            </div>
            
            <div className="card">
              <div className="text-canada-red mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('recommendationsTitle')}</h3>
              <p className="text-gray-700">
                {t('recommendationsDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading">{t('techTitle')}</h2>
            <p className="text-lg text-gray-700 mb-12">
              {t('techDesc')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold mb-3">{t('mlTitle')}</h3>
                <p className="text-gray-700">
                  {t('mlDesc')}
                </p>
              </div>
              
              <div className="text-left p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold mb-3">{t('compDbTitle')}</h3>
                <p className="text-gray-700">
                  {t('compDbDesc')}
                </p>
              </div>
              
              <div className="text-left p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold mb-3">{t('fastScanTitle')}</h3>
                <p className="text-gray-700">
                  {t('fastScanDesc')}
                </p>
              </div>
              
              <div className="text-left p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold mb-3">{t('offlineTitle')}</h3>
                <p className="text-gray-700">
                  {t('offlineDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
