import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import DownloadCTA from '@/components/DownloadCTA';
import CanadianProducts from '@/components/CanadianProducts';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <CanadianProducts />
      <DownloadCTA />
    </div>
  );
}