"use client"; // Add 'use client' because we'll be using hooks

import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import DownloadCTA from '@/components/DownloadCTA';
// Removed import for CanadianProducts
import { useProductSearchPreview } from '@/hooks/useProductSearchPreview'; // Import the new hook
import SearchControlsPreview from '@/components/SearchControlsPreview'; // Import new component
import ProductGridPreview from '@/components/ProductGridPreview'; // Import new component
import ViewMoreProductsLink from '@/components/ViewMoreProductsLink'; // Import new component
import { useTranslations } from 'next-intl'; // Import useTranslations for section title

export default function Home() { 
  const {
    searchTerm, // Add missing state
    handleSearchTermChange, // Add missing handler
    handleSearchSubmit, // Add missing handler
    categories,
    selectedCategory,
    handleCategoryChange,
    sortBy,
    handleSortChange,
    productsPreview,
    isLoadingPreview,
    errorPreview,
  } = useProductSearchPreview(); // Use the hook

  const t = useTranslations('CanadianProducts'); // Get translations for the section title/tagline

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
      
      
      {/* Product Search Preview Section */}
      {/* Removed bg-white to allow layout background to show through */}
      <section className="py-16 relative z-30"> 
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header (similar to old CanadianProducts) */}
          <div className="text-center mb-10"> 
            <span className="inline-block px-4 py-2 bg-red-100 text-red-900 rounded-full font-semibold text-sm mb-4">
              {t('tagline')} 
            </span>
            <h2 className="section-heading">{t('title')}</h2> 
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('description')} {/* Reuse description or create a new one */}
            </p>
          </div>

          {/* Search Controls */}
          <SearchControlsPreview
            searchTerm={searchTerm} // Pass prop
            handleSearchTermChange={handleSearchTermChange} // Pass prop
            handleSearchSubmit={handleSearchSubmit} // Pass prop
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            className="justify-center mb-10" // Center controls and add margin
          />

          {/* Product Grid Preview */}
          <ProductGridPreview
            products={productsPreview}
            isLoading={isLoadingPreview}
            error={errorPreview}
          />

          {/* View More Link */}
          <ViewMoreProductsLink /> 
        </div>
      </section>
      
      <section className="relative">
        <DownloadCTA />
      </section>
      
      {/* Visible divider between DownloadCTA and Footer */}
      <div className="relative z-50 w-full border-t-2 border-black"></div>
    </main>
  );
}
