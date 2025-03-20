"use client";

import React, { useState } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card hover:-translate-y-2 transition duration-300 overflow-hidden relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient that appears on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Red accent line that grows on hover */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 bg-canada-red transition-transform duration-300 origin-left ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <div className={`mb-4 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-canada-dark group-hover:text-canada-red transition">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        {/* Learn more link that appears on hover */}
        <div className={`mt-4 text-canada-red font-medium flex items-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <span>Learn more</span>
          <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;