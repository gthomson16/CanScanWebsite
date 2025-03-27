"use client"; // Add this directive

import { useTranslations, useLocale } from 'next-intl'; // Import hooks

export default function TermsOfService() {
  const t = useTranslations('TermsPage'); // Get translations for this page
  const tPrivacy = useTranslations('PrivacyPage'); // Get translations for shared labels
  const locale = useLocale(); // Get current locale
  const lastUpdatedDate = new Date(2025, 2, 19); // March 19, 2025 (Month is 0-indexed)

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          {tPrivacy('lastUpdatedLabel')}: {lastUpdatedDate.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('acceptanceTitle')}</h2>
        <p>
          {t('acceptanceP1')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('licenseTitle')}</h2>
        <p>
          {t('licenseP1')}
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>{t('licenseList1')}</li>
          <li>{t('licenseList2')}</li>
          <li>{t('licenseList3')}</li>
          <li>{t('licenseList4')}</li>
          <li>{t('licenseList5')}</li>
        </ul>
        <p className="mt-4">
          {t('licenseP2')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('disclaimerTitle')}</h2>
        <p>
          {t('disclaimerP1')}
        </p>
        <p className="mt-4">
          {t('disclaimerP2')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('identificationTitle')}</h2>
        <p>
          {t('identificationP1')}
        </p>
        <p className="mt-4">
          {t('identificationP2')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('limitationsTitle')}</h2>
        <p>
          {t('limitationsP1')}
        </p>
        <p className="mt-4">
          {t('limitationsP2')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('accuracyTitle')}</h2>
        <p>
          {t('accuracyP1')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('linksTitle')}</h2>
        <p>
          {t('linksP1')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('modificationsTitle')}</h2>
        <p>
          {t('modificationsP1')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('governingLawTitle')}</h2>
        <p>
          {t('governingLawP1')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('contactTitle')}</h2>
        <p>
          {t('contactP1')}
        </p>
        <p className="mt-4">
          <strong>{tPrivacy('contactEmailLabel')}</strong> <a href="mailto:support@canscanapp.ca" className="hover:underline">support@canscanapp.ca</a><br />
          <strong>{tPrivacy('contactWhatsappLabel')}</strong> <a href="https://wa.me/19052888925" className="hover:underline">+1 (905) 288-8925</a><br />
          <strong>{tPrivacy('contactAddressLabel')}</strong> Toronto, ON
        </p>
      </div>
    </div>
  );
}
