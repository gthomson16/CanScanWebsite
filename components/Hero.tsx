"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="parallax-container parallax-hero">
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10 parallax-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex justify-center mb-8">
              <Image 
                src="/images/CanScan_white.png" 
                alt="CanScan Logo" 
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <div className="inline-block px-3 py-1 bg-white bg-opacity-20 text-white rounded-full font-semibold text-sm mb-6 animate-pulse">
              <span className="text-sm">🍁</span> Proudly Canadian
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Identify <span className="text-white">Canadian</span> Products with a Simple Scan
            </h1>
            <p className="text-lg text-white text-opacity-90 mb-8">
              CanScan helps you discover and support Canadian businesses by instantly identifying
              Canadian products through barcode and image scanning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download" className="bg-white text-canada-red font-bold py-3 px-6 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Download Now <FiArrowRight className="ml-2" />
              </Link>
              <Link href="/features" className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center shadow-md hover:bg-white hover:bg-opacity-10 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            {/* Phone mockup container with 3D rotation effect */}
            <div className="relative h-[600px] w-[300px] transform perspective-1000 rotate-y-3 rotate-z-1 hover:rotate-y-0 transition-all duration-500">
              <Image 
                src="/images/phone-mockup.svg" 
                alt="CanScan App" 
                fill
                className="object-contain"
              />
              
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            </div>
            
            {/* Decorative maple leaves */}
            <div className="absolute top-20 right-10 text-white animate-float opacity-50">
              <svg width="40" height="40" viewBox="0 0 512 512" fill="currentColor">
                <path d="M256,0c-23.357,0-42.297,18.932-42.297,42.288c0,13.928,6.726,26.264,17.151,33.963
                c-10.24,12.777-26.569,21.489-26.569,21.489s20.075-0.908,30.911-3.024c-7.523,12.304-24.333,26.233-24.333,26.233
                s19.339-3.75,32.499-13.716c-9.889,31.974-34.542,40.623-34.542,40.623s23.535,5.094,43.083-9.343
                c-8.156,21.051-33.971,35.223-33.971,35.223s21.479-1.26,46.815-19.057c7.068,29.653-16.304,60.369-16.304,60.369
                s37.073-15.38,47.446-61.123c4.056,8.48,28.236,18.395,28.236,18.395s-15.659-21.823-18.417-31.863
                c13.891,10.814,40.173,16.52,40.173,16.52s-31.968-26.02-35.906-39.185c13.829,5.46,39.155,6.787,39.155,6.787
                s-28.785-20.012-33.952-30.44c23.389,5.414,57.274-0.463,57.274-0.463s-59.873-10.183-64.693-24.354
                c19.293,0.312,34.218-6.318,34.218-6.318s-24.427-5.779-33.187-13.341c10.424-7.699,17.151-20.035,17.151-33.963
                C298.297,18.932,279.357,0,256,0z"/>
              </svg>
            </div>
            
            <div className="absolute bottom-40 left-10 text-white animate-float-delay opacity-50">
              <svg width="24" height="24" viewBox="0 0 512 512" fill="currentColor">
                <path d="M256,0c-23.357,0-42.297,18.932-42.297,42.288c0,13.928,6.726,26.264,17.151,33.963
                c-10.24,12.777-26.569,21.489-26.569,21.489s20.075-0.908,30.911-3.024c-7.523,12.304-24.333,26.233-24.333,26.233
                s19.339-3.75,32.499-13.716c-9.889,31.974-34.542,40.623-34.542,40.623s23.535,5.094,43.083-9.343
                c-8.156,21.051-33.971,35.223-33.971,35.223s21.479-1.26,46.815-19.057c7.068,29.653-16.304,60.369-16.304,60.369
                s37.073-15.38,47.446-61.123c4.056,8.48,28.236,18.395,28.236,18.395s-15.659-21.823-18.417-31.863
                c13.891,10.814,40.173,16.52,40.173,16.52s-31.968-26.02-35.906-39.185c13.829,5.46,39.155,6.787,39.155,6.787
                s-28.785-20.012-33.952-30.44c23.389,5.414,57.274-0.463,57.274-0.463s-59.873-10.183-64.693-24.354
                c19.293,0.312,34.218-6.318,34.218-6.318s-24.427-5.779-33.187-13.341c10.424-7.699,17.151-20.035,17.151-33.963
                C298.297,18.932,279.357,0,256,0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;