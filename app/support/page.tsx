"use client";

import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="relative pb-32">
      {/* Fixed background image */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          backgroundImage: `url('/images/CanScan_white.png')`,
          backgroundSize: '60%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-95"></div>
      </div>
      
      {/* Page content */}
      <div className="relative z-20">
      {/* Hero Section - 100% opaque */}
      <section 
        className="py-16 md:py-24 relative overflow-hidden"  
        style={{
          position: 'relative',
          zIndex: 30,
          backgroundColor: 'rgba(255, 0, 0, 0.7)'
        }}
      >
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-semibold text-sm mb-4">
              We're Here to Help
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Support Center
            </h1>
            <p className="text-xl text-white text-opacity-90">
              Get help with CanScan app and find answers to common questions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for help articles..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-canada-red">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-transparent relative">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about using CanScan.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem 
              question="How does CanScan identify Canadian products?" 
              answer="CanScan uses advanced image recognition and barcode scanning technology along with our comprehensive database of Canadian products. When you scan a product, our app checks it against our database to determine if it's made in Canada. We also look for specific Canadian certification labels and manufacturing information."
            />
            
            <FaqItem 
              question="Is CanScan available for both iOS and Android?" 
              answer="Yes! CanScan is available for both iOS and Android devices. You can download it from the App Store or Google Play Store."
            />
            
            <FaqItem 
              question="Does CanScan work without an internet connection?" 
              answer="CanScan's core scanning functionality works offline, but for the most comprehensive results, an internet connection is recommended. When offline, the app can still identify many common Canadian products that are cached in the app's local database."
            />
            
            <FaqItem 
              question="How accurate is CanScan's product identification?" 
              answer="CanScan has a high accuracy rate for barcoded products in our database. For image recognition, accuracy depends on the clarity of the image and product packaging. Our system continuously improves as more users scan products, adding to our collective knowledge base."
            />
            
            <FaqItem 
              question="Is my data private when using CanScan?" 
              answer="We take privacy seriously. Your personal information is never sold to third parties. We only collect anonymized scanning data to improve our product database. You can review our full privacy policy for more details on how we handle your information."
            />
            
            <FaqItem 
              question="How can I report an incorrectly identified product?" 
              answer="If you believe a product has been incorrectly identified, you can report it directly in the app. Simply tap the 'Report Issue' button on the product details screen and provide information about the error. Our team reviews all reports to continuously improve our database."
            />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ContactCard 
                title="Email Support"
                description="Send us an email and we'll get back to you within 24 hours."
                action="support@canscan.ca"
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              
              <ContactCard 
                title="Phone Support"
                description="Call our support team Monday to Friday, 9am - 5pm EST."
                action="+1 (888) CAN-SCAN"
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
              
              <ContactCard 
                title="Social Media"
                description="Connect with us on social media for quick responses."
                action="@CanScanApp"
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section className="py-16 bg-transparent pb-24 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading">Join Our Community</h2>
            <p className="text-gray-600 mb-8">
              Connect with other CanScan users, share tips, and help improve our Canadian product database.
            </p>
            <Link 
              href="#" 
              className="btn-primary inline-flex items-center shadow-lg px-8 py-3"
            >
              Join Community
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <button
        className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-canada-dark">{question}</h3>
        <svg
          className={`w-6 h-6 text-canada-red transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-6 pt-0 text-gray-700 border-t border-gray-100">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

interface ContactCardProps {
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, description, action, icon }) => {
  return (
    <div className="card h-full flex flex-col items-center text-center p-8 hover:border-canada-red hover:border transition-all duration-300">
      <div className="mb-4 w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-canada-red">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-auto">
        <span className="font-medium text-canada-red">{action}</span>
      </div>
    </div>
  );
};
