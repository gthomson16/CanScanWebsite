"use client"; // Add this directive

import Link from 'next/link';
import { useTranslations } from 'next-intl'; // Import useTranslations

export default function NotFound() {
  const t = useTranslations('NotFoundPage'); // Get translations

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-600 mb-8">
        {t('message')}
      </p>
      <Link href="/" className="btn-primary">
        {t('goHomeButton')}
      </Link>
    </div>
  );
}
