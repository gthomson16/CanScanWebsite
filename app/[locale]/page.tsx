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
    searchTerm,
    handleSearchTermChange,
    handleSearchSubmit,
    categoryTree,
    selectedCategoryPath,
    onCategorySelect,
    sortBy,
    handleSortChange,
    productsPreview,
    isLoadingPreview,
    errorPreview,
    submittedSearchTerm,
    selectedCategory,
  } = useProductSearchPreview(); // Use the hook

  const t = useTranslations('CanadianProducts'); // Get translations for the section title/tagline

  return (
    <main className="relative">
      {/* Visible divider above Hero section - Change thickness */}
      <div className="relative z-50 w-full border-t border-black"></div>

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

          {/* Search Controls with new CategoryMenu */}
          <SearchControlsPreview
            searchTerm={searchTerm}
            handleSearchTermChange={handleSearchTermChange}
            handleSearchSubmit={handleSearchSubmit}
            categoryTree={categoryTree}
            selectedCategoryPath={selectedCategoryPath}
            onCategorySelect={onCategorySelect}
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

          {/* View More Link - Pass submitted search state */}
          <ViewMoreProductsLink 
            searchTerm={submittedSearchTerm} // Pass the submitted term
            selectedCategory={selectedCategory} 
            sortBy={sortBy} 
          /> 
        </div>
      </section>

      {/* Increase bottom margin on the section containing DownloadCTA */}
      <section className="relative mb-32">
        <DownloadCTA />
      </section>

      {/* Add new divider below CTA */}
      <div className="relative z-50 w-full border-t border-black"></div>

      {/* Visible divider between DownloadCTA and Footer - REMOVED as it's now above */}
      {/* <div className="relative z-50 w-full border-t-2 border-black"></div> */}
    </main>
  );
}
