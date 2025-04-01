import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TermsPageClientContent from '@/components/TermsPageClientContent'; // Import the new client component

// Generate metadata for the Terms page
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'TermsPage' });

  // Extract the first sentence for the description
  const description = t('acceptanceP1').split('.')[0] + '.'; 

  return {
    title: t('title'), // Use a specific title for this page
    description: description, // Use the first sentence of the acceptance paragraph
    alternates: {
      canonical: `/${params.locale}/terms`, // Set canonical URL for this specific page
    },
    // Discourage search engines from indexing terms pages if desired
    // robots: { 
    //   index: false,
    //   follow: false,
    // },
  };
}

// This is now a Server Component
export default function TermsPage() {
  // Render the client component that contains the actual page content
  return <TermsPageClientContent />;
}
