import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DownloadPageClientContent from '@/components/DownloadPageClientContent'; // Import the new client component

// Generate metadata for the Download page
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'DownloadPage' });

  return {
    title: t('heroTitle'), // Use a specific title for this page
    description: t('heroSubtitle'), // Use a specific description
    alternates: {
      canonical: `/${locale}/download`, // Set canonical URL for this specific page
    },
  };
}

// This is now a Server Component
export default function DownloadPage() {
  // Render the client component that contains the actual page content
  return <DownloadPageClientContent />;
}
