"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import packageJson from '../package.json'; // Import package.json

const Footer = () => {
  const t = useTranslations('Footer'); // Footer translations
  const tHeader = useTranslations('Header'); // Header translations for nav links
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  // Check if we're on the support page
  const isSupport = pathname === '/support';
  
  return (
    <footer className="relative overflow-visible text-white z-10 pb-0 bg-gradient-to-br from-canada-red to-red-700">
      {/* Top border for all pages */}
      <div className="w-full border-t-2 border-black relative z-30"></div>
      
      {/* Bottom border just above the white copyright section - removed fixed position */}
      {/* <div className="w-full border-b-2 border-black absolute bottom-[60px] left-0 right-0 z-20"></div> */}
      
      {/* Special white extension for support page */}
      {isSupport && (
        <div 
          className="absolute left-0 right-0 bottom-0 bg-white" 
          style={{ height: '60px', zIndex: 5 }}
        ></div>
      )}
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10 overflow-hidden">
                <Image 
                  src="/images/CanScan_nobg.png" 
                  alt="CanScan Logo" 
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
      <span className="text-xl font-bold">Can<span className="text-black">Scan</span></span>
            </div>
            
            <p className="text-white mb-4">
              {t('description')}
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://x.com/gthomson1" // Updated Twitter/X link
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={t('ariaLabelTwitter')} 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:text-canada-red hover:bg-white hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiTwitter size={18} />
              </a>
              <a 
                href="https://facebook.com/canscanapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={t('ariaLabelFacebook')} 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:text-canada-red hover:bg-white hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiFacebook size={18} />
              </a>
              <a 
                href="https://instagram.com/canscanapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={t('ariaLabelInstagram')} 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:text-canada-red hover:bg-white hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiInstagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block px-3 py-2 bg-white rounded-full">
              <span className="relative z-10 text-black">{t('linksTitle')}</span>
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/" label={tHeader('home')} pathname={pathname} />
              <FooterLink href="/about" label={tHeader('about')} pathname={pathname} />
              <FooterLink href="/features" label={tHeader('features')} pathname={pathname} />
              <FooterLink href="/support" label={tHeader('support')} pathname={pathname} />
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block px-3 py-2 bg-white rounded-full">
              <span className="relative z-10 text-black">{t('downloadTitle')}</span>
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/download" label={t('iosLabel')} pathname={pathname} />
              <FooterLink href="/download" label={t('androidLabel')} pathname={pathname} />
              <li className="mt-4">
                {/* Use dynamic version from package.json */}
                <span className="inline-block px-3 py-1 bg-canada-red bg-opacity-20 text-black rounded-full text-xs">{t('versionLabel', {version: packageJson.version})}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block px-3 py-2 bg-white rounded-full">
              <span className="relative z-10 text-black">{t('contactTitle')}</span>
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-black mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@canscanapp.ca" className="text-white hover:underline">support@canscanapp.ca</a>
              </li>
              <li className="flex items-start">
                <FaWhatsapp className="w-5 h-5 text-black mr-2 mt-0.5" />
                <a href="https://wa.me/19052888925" className="text-white hover:underline">+1 (905) 288-8925</a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-black mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white">{t('locationLabel')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Full-width white copyright section with border at top */}
      <div 
        className="w-full bg-white py-4 relative border-t-2 border-black"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black mb-4 md:mb-0">
            {t('copyright', {year: currentYear})} {/* Use translation for copyright */}
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-black hover:text-black hover:underline transition">
              {t('privacy')} {/* Use translation for privacy */}
            </Link>
            <Link href="/terms" className="text-black hover:text-black hover:underline transition">
              {t('terms')} {/* Use translation for terms */}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
  pathname: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label, pathname }) => {
  // Remove trailing slash if present and compare
  const normalizedPathname = pathname.replace(/\/$/, '');
  const normalizedHref = href.replace(/\/$/, '');
  const isActive = normalizedPathname === normalizedHref;
  
  return (
    <li>
      <Link 
        href={href} 
        className={`${isActive ? 'text-black hover:text-black font-bold' : 'text-white hover:text-white'} hover:underline transition group flex items-center`}
      >
        <span className={`w-0 h-0.5 bg-white group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2`}></span>
        {label}
      </Link>
    </li>
  );
};

export default Footer;
