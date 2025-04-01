import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SupportPageClientContent from '@/components/SupportPageClientContent'; // Import the new client component

// Define the expected shape of the *resolved* params
interface ResolvedPageParams {
  locale: string;
}

// Generate metadata for the Support page
export async function generateMetadata(
  // Explicitly type params as a Promise containing our structure
  { params }: { params: Promise<ResolvedPageParams> } 
): Promise<Metadata> {
  
  // Await the params Promise as required by runtime
  const resolvedParams = await params; 
  const locale = resolvedParams.locale; // Get locale from the resolved object

  const t = await getTranslations({ locale, namespace: 'SupportPage' }); // Use resolved locale

  return {
    title: t('heroTitle'), // Use a specific title for this page
    description: t('heroSubtitle'), // Use a specific description
    alternates: {
      // Use resolved locale here too
      canonical: `/${locale}/support`, 
    },
  };
}

// This is now a Server Component
export default function SupportPage() {
  // Render the client component that contains the actual page content and interactivity
  return <SupportPageClientContent />;
}
