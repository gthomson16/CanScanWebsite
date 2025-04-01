"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslations } from 'next-intl'; // Import useTranslations
import LanguageSwitcher from './LanguageSwitcher'; // Import LanguageSwitcher

const Header = () => {
  const t = useTranslations('Header'); // Initialize translations for 'Header' namespace
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 m-0 ${
      isScrolled ? 'header-glass py-0' : 'bg-white py-0'
    }`}>
      <div className="container mx-auto px-4 py-0">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-24 h-20 overflow-hidden flex items-center justify-center">
              <Image 
                src="/images/CanScan_white.png" 
                alt="CanScan Logo" 
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-canada-red">Can</span><span className="text-black">Scan</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink href="/" label={t('home')} />
            <NavLink href="/about" label={t('about')} />
            <NavLink href="/features" label={t('features')} />
            <NavLink href="/support" label={t('support')} />
          </nav>

          {/* Container for switcher and download button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher /> {/* Add switcher here */}
            <Link href="/download" className="btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              {t('download')}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-canada-red"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? t('ariaLabelClose') : t('ariaLabelOpen')}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute w-full left-0 right-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4" aria-label="Mobile navigation"> {/* Add nav and aria-label */}
            <MobileNavLink href="/" label={t('home')} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/about" label={t('about')} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/features" label={t('features')} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/support" label={t('support')} onClick={() => setIsMenuOpen(false)} />
            <div className="pt-4 border-t border-gray-100"> {/* Add separator and padding */}
              <LanguageSwitcher /> {/* Add switcher to mobile menu */}
            </div>
            <Link 
              href="/download" 
              className="btn-primary w-full text-center shadow-md mt-4" // Add margin top
              onClick={() => setIsMenuOpen(false)}
            >
              {t('download')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

// Desktop navigation link
const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  return (
    <Link 
      href={href} 
      className="relative px-4 py-2 text-gray-700 font-medium hover:text-canada-red transition-colors duration-300 group"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-canada-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

// Mobile navigation link
const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, label, onClick }) => {
  return (
    <Link 
      href={href} 
      className="text-gray-700 hover:text-canada-red font-medium py-2 border-b border-gray-100 flex justify-between items-center"
      onClick={onClick}
    >
      {label}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

export default Header;
