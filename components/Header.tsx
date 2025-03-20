"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'header-glass py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 overflow-hidden">
              <Image 
                src="/images/CanScan_red.png" 
                alt="CanScan Logo" 
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-canada-dark">
              Can<span className="text-canada-red">Scan</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About" />
            <NavLink href="/features" label="Features" />
            <NavLink href="/support" label="Support" />
          </nav>
          
          <div className="hidden md:block">
            <Link href="/download" className="btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Download App
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-canada-red"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute w-full left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="/" label="Home" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/about" label="About" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/features" label="Features" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/support" label="Support" onClick={() => setIsMenuOpen(false)} />
            <Link 
              href="/download" 
              className="btn-primary w-full text-center shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Download App
            </Link>
          </div>
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