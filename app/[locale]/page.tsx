import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import DownloadCTA from '@/components/DownloadCTA';
import CanadianProducts from '@/components/CanadianProducts';
// Reverted: Removed unstable_setRequestLocale import

// Reverted: Removed params from component props
export default function Home() { 
  // Reverted: Removed unstable_setRequestLocale call

  return (
    <main className="relative">
      {/* Visible divider above Hero section */}
      <div className="relative z-50 w-full border-t-2 border-black"></div>
      
      <section className="relative -mt-2">
        <Hero />
      </section>
      
      <section className="relative">
        <FeatureSection />
      </section>
      
      {/* Smaller separator */}
      <div className="h-4"></div>
      
      <section className="relative">
        <CanadianProducts />
      </section>
      
      <section className="relative">
        <DownloadCTA />
      </section>
      
      {/* Visible divider between DownloadCTA and Footer */}
      <div className="relative z-50 w-full border-t-2 border-black"></div>
    </main>
  );
}
