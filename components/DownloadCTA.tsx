"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl'; // Import useTranslations

const DownloadCTA = () => {
  const t = useTranslations('DownloadCTA'); // Get translations
  const pathname = usePathname();
  // Check if we're on the home page
  const isHomePage = pathname === '/'; // Note: This logic might need adjustment with locale prefixes
  return (
    <section className="py-20 relative overflow-visible z-30">
      {/* Top border */}
      <div className="w-full border-t-2 border-black absolute top-0 left-0 right-0 z-20"></div>
      {/* Bottom border - only show on non-home pages */}
      {!isHomePage && <div className="w-full border-b-2 border-black absolute bottom-0 left-0 right-0 z-20"></div>}
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-canada-red to-red-700 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="inline-block px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-semibold text-sm mb-6">
              {t('tagline')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('title')}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-lg">
              {t('description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Disabled App Store Button */}
              <div 
                className="bg-white text-canada-red font-bold py-4 px-6 rounded-lg flex items-center justify-center shadow-lg opacity-50 cursor-not-allowed" // Removed Link, added disabled styles
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG paths remain the same */}
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.547 9.103 1.519 12.082 1 1.462 2.2 3.105 3.773 3.045 1.513-.054 2.09-.98 3.925-.98 1.834 0 2.359.98 3.96.946 1.645-.026 2.691-1.495 3.688-2.96 1.156-1.688 1.636-3.32 1.662-3.4-.036-.014-3.182-1.225-3.22-4.857-.026-3.04 2.48-4.494 2.598-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.594 1.09z" fill="#000"/>
                  <path d="M15.53 3.083c.843-1.021 1.41-2.435 1.245-3.83-1.207.054-2.662.803-3.532 1.812-.775.894-1.452 2.338-1.273 3.714 1.338.104 2.716-.684 3.559-1.696z" fill="#000"/>
                </svg>
                <div>
                  <div className="text-xs">{t('appStoreLabel')}</div>
                  <div className="text-xl font-bold">{t('appStoreName')}</div>
                </div>
              </div>
              {/* Disabled Google Play Button */}
              <div 
                className="bg-white text-canada-red font-bold py-4 px-6 rounded-lg flex items-center justify-center shadow-lg opacity-50 cursor-not-allowed" // Removed Link, added disabled styles
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* SVG paths remain the same */}
                  <path d="M3 20.069V3.931C3 3.4 3.247 2.965 3.701 2.674l8.932 8.708L3.7 20.326A1.494 1.494 0 013 20.07z" fill="#000"/>
                  <path d="M3.701 2.674A1.495 1.495 0 015 2.068l.004-.001 11.648 6.815-3.018 2.94L3.7 2.673z" fill="#000"/>
                  <path d="M16.652 8.882l2.92 1.709a1.495 1.495 0 010 2.818l-2.92 1.709-3.341-3.118 3.341-3.118z" fill="#000"/>
                  <path d="M16.652 15.118L5 21.934a1.5 1.5 0 01-1.299-.608l8.933-8.944 4.018 2.736z" fill="#000"/>
                </svg>
                <div>
                  <div className="text-xs">{t('googlePlayLabel')}</div>
                  <div className="text-xl font-bold">{t('googlePlayName')}</div>
                </div>
              </div>
            </div>
            {/* Coming Soon Text */}
            <p className="text-center sm:text-left text-white opacity-80 mt-4 text-sm">{t('comingSoon')}</p>
            
            {/* User testimonial */}
            <blockquote className="mt-12 bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-sm"> {/* Changed div to blockquote */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-canada-red mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white italic mb-2">{t('testimonial')}</p>
                  <p className="text-white italic mb-2">{t('testimonial')}</p>
                  {/* Consider wrapping author in <cite> or <footer> if needed */}
                  <p className="text-white text-sm font-medium">{t('testimonialAuthor')}</p> 
                </div>
              </div>
            </blockquote> {/* Changed div to blockquote */}
          </div>
          
          <div className="flex justify-center lg:justify-end relative">
            {/* Phone mockup with glow effect */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white blur-xl opacity-20"></div>
              <div className="relative h-[500px] w-[250px] transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[5deg] transform-gpu overflow-hidden">
                <Image 
                  src="/images/screens/bilingual.jpg" 
                  alt="CanScan App" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
