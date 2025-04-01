"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslations } from 'next-intl'; // Removed useLocale import

const Hero = () => {
  const t = useTranslations('Hero'); // Get translations for the 'Hero' namespace
  // Removed locale variable
  const downloadButtonText = t('downloadButton'); // Get text 
  // Removed console.log

  return (
    <section className="bg-gradient-to-br from-canada-red to-red-700 -mt-2 relative"> {/* Changed div to section */}
      {/* Top border */}
      <div className="w-full border-t-2 border-black absolute top-0 left-0 right-0 z-20"></div>
      {/* Bottom border */}
      <div className="w-full border-b-2 border-black absolute bottom-0 left-0 right-0 z-20"></div>
      <div className="container mx-auto px-4 pt-16 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex justify-center mb-8">
              <Image 
                src="/images/CanScan_nobg.png" 
                alt="CanScan Logo" 
                width={313}
                height={313}
                className="object-contain"
              />
            </div>
            <div className="inline-block px-3 py-1 bg-white bg-opacity-20 text-white rounded-full font-semibold text-sm mb-6 animate-pulse">
              <span className="text-sm">🍁</span> {t('proudlyCanadian')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.rich('headline', {
                highlight: (chunks) => <span className="text-white">{chunks}</span>
              })}
            </h1>
            <p className="text-lg text-white text-opacity-90 mb-8">
              {t('subheadline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download" className="bg-white text-canada-red font-bold py-3 px-6 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                {downloadButtonText} <FiArrowRight className="ml-2" /> {/* Use variable */}
              </Link>
              <Link href="/features" className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center shadow-md hover:bg-white hover:bg-opacity-10 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                {t('learnMoreButton')}
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            {/* Phone mockup container with 3D effect */}
            <div className="relative h-[600px] w-[300px] transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[5deg] transform-gpu">
              <Image 
                src="/images/screens/home.jpg" 
                alt="CanScan App" 
                fill
                className="object-contain"
              />
              
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-red-600 blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section> // Changed div to section
  );
};

export default Hero;
