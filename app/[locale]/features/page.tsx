import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FeaturesPageClientContent from '@/components/FeaturesPageClientContent'; // Import the new client component

// Generate metadata for the Features page
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'FeaturesPage' });

  return {
    title: t('heroTitle'), // Use a specific title for this page
    description: t('heroSubtitle'), // Use a specific description
    alternates: {
      canonical: `/${params.locale}/features`, // Set canonical URL for this specific page
    },
  };
}

// This is now a Server Component
export default function FeaturesPage() {
  // Render the client component that contains the actual page content
  return <FeaturesPageClientContent />;
}
