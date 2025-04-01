import '../globals.css'; // Corrected path
import '../mobile-scroll.css'; // Corrected path
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server'; 
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// Import getTranslations for metadata
import {getTranslations} from 'next-intl/server';
import { locales } from '@/i18n'; // Correct: Use named import for locales

const BASE_URL = 'https://canscanapp.ca';

// Generate dynamic metadata based on locale
export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  // In Next.js 15, we need to await params before accessing its properties
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Fetch translations from multiple namespaces
  const tHome = await getTranslations({locale, namespace: 'HomePage'});
  const tMeta = await getTranslations({locale, namespace: 'Metadata'});

  const title = tHome('title');
  const description = tHome('description');
  const siteName = tMeta('siteName');
  const ogImageAlt = tMeta('ogImageAlt');
  const ogImageUrl = '/images/CanScan_white.png'; // Relative to metadataBase

  // Construct language alternates dynamically
  const languages: { [key: string]: string } = {};
  locales.forEach((loc: string) => { // Add explicit type 'string' to loc
    languages[loc] = `${BASE_URL}/${loc}`; // Absolute URLs for hreflang
  });

  return {
    metadataBase: new URL(BASE_URL), // Set the base URL for resolving relative paths
    title: title,
    description: description,
    authors: [{ name: 'CanScan Team' }],
    keywords: ['Canada', 'Canadian products', 'scanner', 'barcode', 'image recognition', 'shopping', 'produits canadiens', 'balayage', 'reconnaissance d\'image'], // Added French keywords

    // Open Graph Metadata (for Facebook, LinkedIn, etc.)
    openGraph: {
      title: title,
      description: description,
      url: '/', // Relative URL for the current page (layout applies to root)
      siteName: siteName,
      images: [
        {
          url: ogImageUrl, // Relative path resolves against metadataBase
          width: 800, // Provide dimensions if known, otherwise omit or use defaults
          height: 600,
          alt: ogImageAlt,
        },
      ],
      locale: locale === 'en' ? 'en_CA' : 'fr_CA', // Specific locale
      type: 'website',
    },

    // Twitter Card Metadata
    twitter: {
      card: 'summary_large_image', // Use 'summary' if image is smaller/square
      title: title,
      description: description,
      images: [ogImageUrl], // Relative path resolves against metadataBase
      site: '@gthomson1', // Added Twitter handle
      // creator: '@CreatorTwitterHandle', // Optional: Add creator handle
    },

    // Canonical URL and Language Alternates
    alternates: {
      canonical: '/', // Relative canonical URL for the root page of the locale
      languages: languages, // hreflang tags
    },

    // Optional: Robots meta tag (can be configured globally or per page)
    // robots: {
    //   index: true,
    //   follow: true,
    //   nocache: true,
    //   googleBot: {
    //     index: true,
    //     follow: false,
    //     noimageindex: true,
    //     'max-video-preview': -1,
    //     'max-image-preview': 'large',
    //     'max-snippet': -1,
    //   },
    // },

    // Optional: Icons (already handled in <head>, but can be defined here too)
    // icons: {
    //   icon: '/images/CanScan_icon.png',
    //   shortcut: '/images/CanScan_icon.png',
    //   apple: '/images/CanScan_icon.png',
    //   other: {
    //     rel: 'apple-touch-icon-precomposed',
    //     url: '/images/CanScan_icon.png',
    //   },
    // },
  };
}

// Make layout async to properly handle dynamic parameters in Next.js 15
export default async function RootLayout({ 
  children,
  params // Pass the whole params object
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string}; 
}>) {
  // In Next.js 15, await params before accessing properties in async components
  const resolvedParams = await params;
  const locale = resolvedParams.locale; 

  // Use server-side getMessages, explicitly passing the locale
  const messages = await getMessages({ locale: locale });

  return (
    <html lang={locale} className="scroll-smooth m-0 p-0">{/* Ensure no space/newline before <head> */}
      <head>
        {/* Allow user scaling for accessibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/images/CanScan_icon.png" sizes="any" />
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CanScan",
            "url": BASE_URL, // Use the BASE_URL constant defined earlier
            "logo": `${BASE_URL}/images/CanScan_red.png` // Assuming this is a good logo representation
            // Add other properties like "contactPoint", "address", "sameAs" (social links) if desired
          }) }}
        />
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": BASE_URL,
            "name": "CanScan",
            // Potential search action if you implement site search
            // "potentialAction": {
            //   "@type": "SearchAction",
            //   "target": `${BASE_URL}/search?q={search_term_string}`,
            //   "query-input": "required name=search_term_string"
            // }
          }) }}
        />
      </head>
      <body className={inter.className}>
        {/* Background/Overlay divs outside the provider */}
        <div 
          className="fixed inset-0 z-0 background-image-container" 
          style={{
            backgroundImage: `url('/images/CanScan_white.png')`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
          }}
        />
        <div className="fixed inset-0 z-1 pointer-events-none">
          <div className="absolute inset-0 bg-white opacity-95"></div>
        </div>
          
        {/* Wrap only the main content structure with the provider */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen relative z-20 overflow-hidden">
              <Header />
              <main className="flex-grow m-0 p-0">
                {children}
              </main>
              <Footer />
            </div>
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
