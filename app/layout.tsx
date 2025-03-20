import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import ScrollDebugger from '@/components/ScrollDebugger';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CanScan - Canadian Product Scanner',
  description: 'CanScan helps Canadians identify Canadian products through barcode and image scanning.',
  authors: [{ name: 'CanScan Team' }],
  keywords: ['Canada', 'Canadian products', 'scanner', 'barcode', 'image recognition', 'shopping'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/CanScan_red.png" sizes="any" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ScrollDebugger />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}