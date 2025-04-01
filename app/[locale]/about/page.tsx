import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutPageClientContent from '@/components/AboutPageClientContent'; // Import the new client component

// Generate metadata for the About page
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> { // Accept full params object
  const resolvedParams = await params; // Await params
  const locale = resolvedParams.locale; // Extract locale after awaiting
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return {
    title: t('heroTitle'), // Use a specific title for this page
    description: t('heroSubtitle'), // Use a specific description
    // Other metadata like OpenGraph will be inherited from the layout
    // unless overridden here.
    alternates: {
      canonical: `/${locale}/about`, // Set canonical URL for this specific page
    },
  };
}

// This is now a Server Component
export default function AboutPage() {
  // Render the client component that contains the actual page content and interactivity
  return <AboutPageClientContent />;
}
