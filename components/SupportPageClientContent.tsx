"use client";

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from 'next-intl'; // Import useTranslations

// Helper component for FAQ items (needs state)
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

// Helper component for Contact cards
interface ContactCardProps {
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  href?: string;
}
const ContactCard: React.FC<ContactCardProps> = ({ title, description, action, icon, href }) => {
  const content = (
    <>
      <div className="mb-4 w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-canada-red">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-auto">
        <span className="font-medium text-canada-red">{action}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className="card h-full flex flex-col items-center text-center p-8 hover:border-canada-red hover:border transition-all duration-300"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="card h-full flex flex-col items-center text-center p-8 hover:border-canada-red hover:border transition-all duration-300">
      {content}
    </div>
  );
};


// Main Client Component for the Support Page
export default function SupportPageClientContent() {
  const t = useTranslations('SupportPage'); // Get translations

  return (
    <div className="relative pb-32">
      
      {/* Page content */}
      <div className="relative z-20">
      {/* Hero Section - 100% opaque */}
      <section 
        className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-canada-red to-red-700"  
        style={{
          position: 'relative',
          zIndex: 20,
          backgroundColor: 'rgba(255, 0, 0, 1)'
        }}
      >
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white bg-opacity-20 text-white rounded-full font-semibold text-sm mb-4">
              {t('heroTagline')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-white text-opacity-90">
              {t('heroSubtitle')}
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
                placeholder={t('searchPlaceholder')} 
                className="w-full bg-gray-50 border border-black rounded-full py-4 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent text-black placeholder-black"
              />
              <button 
                aria-label={t('searchAriaLabel')} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-canada-red"
              >
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
            <h2 className="section-heading">{t('faqTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('faqDesc')}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem 
              question={t('faq1Q')} 
              answer={t('faq1A')}
            />
            
            <FaqItem 
              question={t('faq2Q')} 
              answer={t('faq2A')}
            />
            
            <FaqItem 
              question={t('faq3Q')} 
              answer={t('faq3A')}
            />
            
            <FaqItem 
              question={t('faq4Q')} 
              answer={t('faq4A')}
            />
            
            <FaqItem 
              question={t('faq5Q')} 
              answer={t('faq5A')}
            />
            
            <FaqItem 
              question={t('faq6Q')} 
              answer={t('faq6A')}
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
                title={t('contactEmailTitle')}
                description={t('contactEmailDesc')}
                action="support@canscanapp.ca"
                href="mailto:support@canscanapp.ca"
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              
              <ContactCard 
                title={t('contactWhatsappTitle')}
                description={t('contactWhatsappDesc')}
                action="+1 (905) 288-8925"
                href="https://wa.me/19052888925"
                icon={<FaWhatsapp className="w-8 h-8" />}
              />
              
              <ContactCard 
                title={t('contactSocialTitle')}
                description={t('contactSocialDesc')}
                action={t('contactSocialAction')}
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
            <h2 className="section-heading">{t('communityTitle')}</h2>
            <p className="text-gray-600 mb-8">
              {t('communityDesc')}
            </p>
            <Link 
              href="#" 
              className="btn-primary inline-flex items-center shadow-lg px-8 py-3"
            >
              {t('communityButton')}
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
