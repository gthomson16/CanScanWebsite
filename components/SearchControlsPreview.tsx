'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ProductSearch.module.css'; // Import styles
import CategoryMenu from './CategoryMenu'; // Import the new CategoryMenu component

// Define the structure for a category node (matching the one in ProductSearchClient)
interface CategoryNode {
  name: string;
  children: CategoryNode[];
  productCount?: number; // Add optional product count
}

// Updated Props for Category Menu
interface SearchControlsPreviewProps {
    searchTerm: string;
    handleSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSearchSubmit?: (event?: FormEvent<HTMLFormElement>) => void; // Make optional if not always used

    // Replace the multi-level dropdown props with:
    categoryTree: CategoryNode[]; // The complete category tree
    selectedCategoryPath: string[]; // Selected categories path
    onCategorySelect: (categoryPath: string[]) => void; // Handler for selection

    sortBy: 'liked' | 'rated' | 'reviewed';
    handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

const SearchControlsPreview: React.FC<SearchControlsPreviewProps> = ({
    searchTerm,
    handleSearchTermChange,
    handleSearchSubmit,
    categoryTree,
    selectedCategoryPath,
    onCategorySelect,
    sortBy,
    handleSortChange,
    className = '',
}) => {
    const t = useTranslations('ProductSearchPage');

    return (
        // Use a form for better accessibility and handling Enter key
        <form
            onSubmit={handleSearchSubmit}
            // Responsive flex layout: column on small, row on medium+, wrap items
            className={`flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-6 ${className}`}
        >
            {/* Group 1: Search Input + Button (if submit handler exists) */}
            <div className="flex items-center w-full md:w-auto"> {/* Full width on small, auto on medium+ */}
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent flex-grow md:w-80 lg:w-96" // Adjusted width
                    aria-label={t('searchAriaLabel')}
                    style={{ minWidth: '150px' }}
                />
                {handleSearchSubmit && ( // Conditionally render button
                    <button
                        type="submit"
                        className="px-4 py-2 bg-canada-red text-white rounded-r-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-1 h-[calc(2.5rem+2px)]" // Match input height
                    >
                        {t('searchButtonText')}
                    </button>
                )}
                 {!handleSearchSubmit && ( // If no submit handler, round the input's right side
                    <style jsx>{`
                        input { border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem; }
                    `}</style>
                 )}
            </div>

            {/* Group 2: Replace Multi-Level Category Filters with CategoryMenu */}
            <CategoryMenu
                categoryTree={categoryTree}
                selectedCategoryPath={selectedCategoryPath}
                onCategorySelect={onCategorySelect}
                className="w-full md:w-auto"
            />

            {/* Group 3: Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto"> {/* Full width on small */}
                <label
                    htmlFor="sort-preview"
                    className={`${styles.sortLabel} whitespace-nowrap`}
                >
                    {t('sortByLabel')}
                </label>
                <select
                    id="sort-preview"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent"
                >
                    <option value="liked">{t('sortByLiked')}</option>
                    <option value="rated">{t('sortByRated')}</option>
                    <option value="reviewed">{t('sortByReviewed')}</option>
                </select>
            </div>
        </form>
    );
};

export default SearchControlsPreview;
