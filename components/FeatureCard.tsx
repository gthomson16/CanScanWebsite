import React from 'react'; // Removed useState
import Link from 'next/link'; // Added Link for "Learn more"

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Removed "use client" - component is now CSS-driven for hover
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  // Removed useState for isHovered
  
  return (
    // Added 'group' class for group-hover utilities
    <div 
      className="group card hover:-translate-y-2 transition duration-300 overflow-hidden relative h-full"
      // Removed onMouseEnter/onMouseLeave
    >
      {/* Background gradient using group-hover */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      />
      
      {/* Red accent line using group-hover */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-canada-red transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Icon scaling using group-hover */}
        <div className="mb-4 bg-red-50 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 scale-100 group-hover:scale-110">
          {icon}
        </div>
        
        {/* Title color already uses group-hover */}
        <h3 className="text-xl font-bold mb-2 text-canada-dark group-hover:text-canada-red transition">{title}</h3> 
        <p className="text-gray-600">{description}</p>
        
        {/* Learn more link using group-hover and wrapped in Link */}
        <Link 
          href="#" // Placeholder link - update if specific feature links exist
          className="mt-4 text-canada-red font-medium flex items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        >
          <span>Learn more</span>
          {/* Arrow icon already uses group-hover */}
          <svg className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
