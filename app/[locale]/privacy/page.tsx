import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PrivacyPageClientContent from '@/components/PrivacyPageClientContent'; // Import the new client component

// Generate metadata for the Privacy page
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });

  // Extract the first sentence for the description
  const description = t('introP1').split('.')[0] + '.'; 

  return {
    title: t('title'), // Use a specific title for this page
    description: description, // Use the first sentence of the intro paragraph
    alternates: {
      canonical: `/${locale}/privacy`, // Set canonical URL for this specific page
    },
    // Discourage search engines from indexing privacy policy pages if desired
    // robots: { 
    //   index: false,
    //   follow: false,
    // },
  };
}

// This is now a Server Component
export default function PrivacyPage() {
  // Render the client component that contains the actual page content
  return <PrivacyPageClientContent />;
}
