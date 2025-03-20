"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  // Check if we're on the support page
  const isSupport = pathname === '/support';
  
  return (
    <footer 
      className="relative overflow-hidden text-black z-10" 
      style={{
        backgroundColor: 'rgba(255, 0, 0, 0.7)'
      }}>
      
      {/* Special white extension for support page */}
      {isSupport && (
        <div 
          className="absolute left-0 right-0 bottom-0 bg-white" 
          style={{ height: '60px', zIndex: 5 }}
        ></div>
      )}
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 pt-10 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10 overflow-hidden">
                <Image 
                  src="/images/CanScan_white.png" 
                  alt="CanScan Logo" 
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">CanScan</span>
            </div>
            
            <p className="text-black mb-4">
              Helping Canadians identify and support local products through advanced scanning technology.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-black bg-opacity-20 flex items-center justify-center text-black hover:bg-black hover:bg-opacity-30 transition-colors duration-300">
                <FiTwitter size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-black bg-opacity-20 flex items-center justify-center text-black hover:bg-black hover:bg-opacity-30 transition-colors duration-300">
                <FiFacebook size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-black bg-opacity-20 flex items-center justify-center text-black hover:bg-black hover:bg-opacity-30 transition-colors duration-300">
                <FiInstagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Links</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-canada-red"></span>
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/about" label="About" />
              <FooterLink href="/features" label="Features" />
              <FooterLink href="/support" label="Support" />
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Download</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-canada-red"></span>
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/download" label="iOS App" />
              <FooterLink href="/download" label="Android App" />
              <li className="mt-4">
                <span className="inline-block px-3 py-1 bg-canada-red bg-opacity-20 text-white rounded-full text-xs">Latest Version: 2.1.0</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-canada-red"></span>
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-canada-red mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-black">support@canscan.ca</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-canada-red mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-black">+1 (888) CAN-SCAN</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-canada-red mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-black">Toronto, Canada</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div 
          className="border-t border-black border-opacity-20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{
            backgroundColor: isSupport ? 'white' : 'transparent',
            padding: isSupport ? '16px' : '0px',
            margin: isSupport ? '8px -16px -16px -16px' : '8px 0 0 0',
            borderRadius: isSupport ? '0 0 8px 8px' : '0'
          }}
        >
          <p className="text-black mb-4 md:mb-0 font-bold">
            &copy; {currentYear} CanScan. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-black hover:text-black hover:underline transition font-bold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-black hover:text-black hover:underline transition font-bold">
              Terms of Service
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
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <li>
      <Link 
        href={href} 
        className="text-black hover:text-black hover:underline transition group flex items-center"
      >
        <span className="w-0 h-0.5 bg-canada-red group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2"></span>
        {label}
      </Link>
    </li>
  );
};

export default Footer;