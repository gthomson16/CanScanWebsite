import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SupportPageClientContent from '@/components/SupportPageClientContent'; // Import the new client component

// Generate metadata for the Support page
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'SupportPage' });

  return {
    title: t('heroTitle'), // Use a specific title for this page
    description: t('heroSubtitle'), // Use a specific description
    alternates: {
      canonical: `/${locale}/support`, // Set canonical URL for this specific page
    },
  };
}

// This is now a Server Component
export default function SupportPage() {
  // Render the client component that contains the actual page content and interactivity
  return <SupportPageClientContent />;
}
