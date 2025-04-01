import React from 'react';
import Image from 'next/image';

// Define CheckmarkIcon locally for now
const CheckmarkIcon = () => (
  <svg className="w-6 h-6 mr-2 text-canada-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface DetailedFeatureProps {
  icon: React.ReactNode;
  title: string; // Expect pre-translated title
  description: string; // Expect pre-translated description
  listItems: string[]; // Expect array of pre-translated list items
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right'; // Default to 'right' if not provided
}

const DetailedFeature: React.FC<DetailedFeatureProps> = ({
  icon,
  title,
  description,
  listItems,
  imageSrc,
  imageAlt,
  imagePosition = 'right', // Default image position
}) => {
  const textContent = (
    <div>
      <div className="inline-block text-canada-red mb-4">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
      <p className="text-gray-700 mb-6">
        {description}
      </p>
      <ul className="space-y-3">
        {listItems.map((item, index) => (
          <li key={index} className="flex items-start">
            <CheckmarkIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const imageContent = (
    <div className="relative">
      <div className="flex justify-center items-center">
        <div className="relative">
          {/* Optional: Add back glow if desired */}
          {/* <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-blue-50 blur-xl opacity-40"></div> */}
          <div className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:-translate-y-2 hover:rotate-[5deg] transform-gpu">
            <Image 
              src={imageSrc} 
              alt={imageAlt} 
              width={240} // Keep consistent sizing for now
              height={480}
              className="" // Add object-contain if needed based on image aspect ratios
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {imagePosition === 'left' ? (
        <>
          <div className="order-2 md:order-1">{imageContent}</div>
          <div className="order-1 md:order-2">{textContent}</div>
        </>
      ) : (
        <>
          <div className="order-1">{textContent}</div>
          <div className="order-2">{imageContent}</div>
        </>
      )}
    </div>
  );
};

export default DetailedFeature;
