import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PrivacyPageClientContent from '@/components/PrivacyPageClientContent'; // Import the new client component

// Define the expected shape of the *resolved* params
interface ResolvedPageParams {
  locale: string;
}

// Generate metadata for the Privacy page
export async function generateMetadata(
  // Explicitly type params as a Promise containing our structure
  { params }: { params: Promise<ResolvedPageParams> } 
): Promise<Metadata> {
  
  // Await the params Promise as required by runtime
  const resolvedParams = await params; 
  const locale = resolvedParams.locale; // Get locale from the resolved object

  const t = await getTranslations({ locale, namespace: 'PrivacyPage' }); // Use resolved locale

  // Extract the first sentence for the description
  const description = t('introP1').split('.')[0] + '.'; 

  return {
    title: t('title'), // Use a specific title for this page
    description: description, // Use the first sentence of the intro paragraph
    alternates: {
      // Use resolved locale here too
      canonical: `/${locale}/privacy`, 
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
