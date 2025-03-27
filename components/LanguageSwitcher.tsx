'use client';

import { useLocale, useTranslations } from 'next-intl'; // Import useTranslations
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher'); // Get translations
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    // Extract the path without the current locale prefix
    const currentPathWithoutLocale = pathname.startsWith(`/${locale}`) 
      ? pathname.substring(locale.length + 1) // Remove /en or /fr
      : pathname; // Root path doesn't have locale prefix yet
      
    // Ensure leading slash for consistency
    const nextPath = currentPathWithoutLocale.startsWith('/') ? currentPathWithoutLocale : `/${currentPathWithoutLocale}`;
      
    router.push(`/${nextLocale}${nextPath}`);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        onChange={handleChange}
        value={locale}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-canada-red"
        aria-label={t('label')}
      >
        <option value="en">{t('en')}</option>
        <option value="fr">{t('fr')}</option>
      </select>
    </div>
  );
}
