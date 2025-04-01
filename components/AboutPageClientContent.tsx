'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';
import { useTranslations } from 'next-intl'; // Import useTranslations

export default function AboutPageClientContent() {
  const t = useTranslations('AboutPage'); // Get translations
  // State for image sources
  const [grahamImage, setGrahamImage] = useState('/images/graham.png');
  const [lunaImage, setLunaImage] = useState('/images/luna.jpg');

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-canada-red to-red-700 py-16 md:py-24 relative">
        {/* Top border */}
        <div className="w-full border-t-2 border-black absolute top-0 left-0 right-0 z-20"></div>
        {/* Bottom border */}
        <div className="w-full border-b-2 border-black absolute bottom-0 left-0 right-0 z-20"></div>
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
      
      {/* Mission Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-center">{t('missionTitle')}</h2>
            <p className="text-lg text-gray-700 mb-8">
              {t('missionP1')}
            </p>
            <p className="text-lg text-gray-700 mb-8">
              {t('missionP2')}
            </p>
            <div className="bg-red-50 border-l-4 border-canada-red p-6 rounded-r-lg">
              <p className="text-gray-700 italic">
                {t('missionQuote')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mb-12">{t('teamTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team member cards would go here */}
            <div className="card text-center">
              <div 
                className="w-60 md:w-96 h-60 md:h-96 rounded-full mx-auto mb-4 overflow-hidden"
                onMouseEnter={() => setGrahamImage('/images/graham_anime.png')}
                onMouseLeave={() => setGrahamImage('/images/graham.png')}
              >
                <Image src={grahamImage} alt="Graham Thomson" width={450} height={450} quality={100} className="object-cover w-full h-full transition-opacity duration-300" style={{ objectPosition: 'center 20%' }} />
              </div>
              <h3 className="text-xl font-bold mb-1">Graham Thomson</h3>
              <p className="text-gray-600 mb-1">{t('grahamTitle')}</p>
              <p className="text-gray-600 mb-3">{t('grahamRole')}</p>
              <p className="text-gray-700 mb-3">{t('grahamDesc')}</p>
              <Link href="https://www.linkedin.com/in/graham-thomson16/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <FaLinkedin className="w-5 h-5 mr-1" /> LinkedIn
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="w-60 md:w-96 h-60 md:h-96 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">{t('joinUs')}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{t('hiringTitle')}</h3>
              <p className="text-gray-600 mb-3">{t('hiringSubtitle')}</p>
              <p className="text-gray-700">{t('hiringDesc')}</p>
            </div>
            
            <div className="card text-center">
              <div 
                className="w-60 md:w-96 h-60 md:h-96 rounded-full mx-auto mb-4 overflow-hidden"
                onMouseEnter={() => setLunaImage('/images/luna_anime.png')}
                onMouseLeave={() => setLunaImage('/images/luna.jpg')}
              >
                <Image src={lunaImage} alt="Luna" width={384} height={384} quality={100} className="object-cover w-full h-full transition-opacity duration-300" style={{ objectPosition: 'center 15%' }} />
              </div>
              <h3 className="text-xl font-bold mb-1">Luna</h3>
              <p className="text-gray-600 mb-1">{t('lunaTitle')}</p>
              <p className="text-gray-600 mb-3">{t('lunaRole')}</p>
              <p className="text-gray-700 mb-3">{t('lunaDesc')}</p>
              <Link href="https://www.instagram.com/luna.the.frenchie2021/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors">
                <FaInstagram className="w-5 h-5 mr-1" /> Instagram
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Canadian Values Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-heading text-center">{t('valuesTitle')}</h2>
            <p className="text-lg text-gray-700 mb-8">
              {t('valuesDesc')}
            </p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-4 text-canada-red">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t('value1Title')}</h3>
                  <p className="text-gray-700">{t('value1Desc')}</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4 text-canada-red">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t('value2Title')}</h3>
                  <p className="text-gray-700">{t('value2Desc')}</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4 text-canada-red">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t('value3Title')}</h3>
                  <p className="text-gray-700">{t('value3Desc')}</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4 text-canada-red">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{t('value4Title')}</h3>
                  <p className="text-gray-700">{t('value4Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
