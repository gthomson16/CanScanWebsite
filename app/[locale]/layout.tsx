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

// Generate dynamic metadata based on locale
export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> { 
  // In Next.js 15, we need to await params before accessing its properties
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  // Now use the resolved locale
  const t = await getTranslations({locale, namespace: 'HomePage'}); 

  return {
    title: t('title'),
    description: t('description'),
    authors: [{ name: 'CanScan Team' }],
    keywords: ['Canada', 'Canadian products', 'scanner', 'barcode', 'image recognition', 'shopping'],
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/images/CanScan_icon.png" sizes="any" />
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
