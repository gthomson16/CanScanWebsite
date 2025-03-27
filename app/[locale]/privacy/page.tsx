"use client"; // Add this directive

import { useTranslations, useLocale } from 'next-intl'; // Import useLocale

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPage'); // Get translations
  const locale = useLocale(); // Get current locale
  const lastUpdatedDate = new Date(2025, 2, 19); // March 19, 2025 (Month is 0-indexed)

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          {t('lastUpdatedLabel')}: {lastUpdatedDate.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('introTitle')}</h2>
        <p>
          {t('introP1')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('collectTitle')}</h2>
        <p>
          {t('collectP1')}
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>{t('collectList1').split(':')[0]}:</strong> {t('collectList1').split(':').slice(1).join(':').trim()}</li>
          <li><strong>{t('collectList2').split(':')[0]}:</strong> {t('collectList2').split(':').slice(1).join(':').trim()}</li>
          <li><strong>{t('collectList3').split(':')[0]}:</strong> {t('collectList3').split(':').slice(1).join(':').trim()}</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('useTitle')}</h2>
        <p>
          {t('useP1')}
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>{t('useList1')}</li>
          <li>{t('useList2')}</li>
          <li>{t('useList3')}</li>
          <li>{t('useList4')}</li>
          <li>{t('useList5')}</li>
          <li>{t('useList6')}</li>
          <li>{t('useList7')}</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('shareTitle')}</h2>
        <p>
          {t('shareP1')}
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>{t('shareList1').split(':')[0]}:</strong> {t('shareList1').split(':').slice(1).join(':').trim()}</li>
          <li><strong>{t('shareList2').split(':')[0]}:</strong> {t('shareList2').split(':').slice(1).join(':').trim()}</li>
          <li><strong>{t('shareList3').split(':')[0]}:</strong> {t('shareList3').split(':').slice(1).join(':').trim()}</li>
          <li><strong>{t('shareList4').split(':')[0]}:</strong> {t('shareList4').split(':').slice(1).join(':').trim()}</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('securityTitle')}</h2>
        <p>
          {t('securityP1')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('rightsTitle')}</h2>
        <p>
          {t('rightsP1')}
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>{t('rightsList1')}</li>
          <li>{t('rightsList2')}</li>
          <li>{t('rightsList3')}</li>
          <li>{t('rightsList4')}</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('changesTitle')}</h2>
        <p>
          {t('changesP1')}
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">{t('contactTitle')}</h2>
        <p>
          {t('contactP1')}
        </p>
        <p className="mt-4">
          <strong>{t('contactEmailLabel')}</strong> <a href="mailto:support@canscanapp.ca" className="hover:underline">support@canscanapp.ca</a><br />
          <strong>{t('contactWhatsappLabel')}</strong> <a href="https://wa.me/19052888925" className="hover:underline">+1 (905) 288-8925</a><br />
          <strong>{t('contactAddressLabel')}</strong> Toronto, ON
        </p>
      </div>
    </div>
  );
}
