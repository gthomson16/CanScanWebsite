// Server Component - No 'use client' directive here

// Import Metadata type and server-side translation function
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// Import the client component we just created
import ProductSearchClient from '@/components/ProductSearchClient';

// Define the expected shape of the *resolved* params for metadata
interface ResolvedPageParams {
  locale: string;
}

// Generate metadata for the Product Search page (Server-side)
// This function remains here as it needs to run on the server
export async function generateMetadata(
  { params }: { params: Promise<ResolvedPageParams> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'ProductSearchPage' });

  return {
    title: t('heroTitle'), // Use a specific title for this page
    description: t('heroSubtitle'), // Use a specific description
    alternates: {
      canonical: `/${locale}/product-search`,
    },
  };
}

// --- Server Component Wrapper ---
// Default export is now the Server Component that renders the Client Component
export default function ProductSearchPage() {
  // This Server Component simply renders the Client Component
  // All client-side logic (hooks, state, etc.) is handled within ProductSearchClient
  return <ProductSearchClient />;
}
