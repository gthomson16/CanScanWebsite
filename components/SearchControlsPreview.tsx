import React, { ChangeEvent, FormEvent } from 'react'; // Added FormEvent
import { useTranslations } from 'next-intl';
import styles from './ProductSearch.module.css'; // Import styles

interface SearchControlsPreviewProps {
    searchTerm: string; // Added
    handleSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void; // Added
    handleSearchSubmit: (event?: FormEvent<HTMLFormElement>) => void; // Added
    categories: string[];
    selectedCategory: string;
    handleCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    sortBy: 'liked' | 'rated' | 'reviewed';
    handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    className?: string; 
}

const SearchControlsPreview: React.FC<SearchControlsPreviewProps> = ({
    searchTerm, // Added
    handleSearchTermChange, // Added
    handleSearchSubmit, // Added
    categories,
    selectedCategory,
    handleCategoryChange,
    sortBy,
    handleSortChange,
    className = '', 
}) => {
    const t = useTranslations('ProductSearchPage'); 
    const tCat = useTranslations('AmazonCategories'); // Add translation hook for categories

    // Function to safely get translation or fall back to the raw category name
    const getCategoryTranslation = (category: string) => {
        try {
            // Just return the original category name without translation
            // This prevents showing the full namespace path in the UI
            return category;
        } catch (e) {
            // If translation fails, return the original category name
            return category;
        }
    };

    return (
        // Use a form for better accessibility and handling Enter key
        // Main container: stacks vertically on mobile, row on sm+, centers items
        <form 
            onSubmit={handleSearchSubmit} 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 ${className}`} // Responsive flex, gap
        > 
            {/* Group 1: Search Input + Button */}
            <div className="flex items-center w-full sm:w-auto"> {/* Flex group for input/button */}
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    // Use Tailwind for padding, border, rounded corners, focus states + WIDER RESPONSIVE WIDTH
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent flex-grow md:w-96" 
                    aria-label={t('searchAriaLabel')}
                    style={{ minWidth: '200px' }} // Keep min-width if needed, Tailwind width will override on md+
                />
                <button 
                    type="submit" 
                    // Use Tailwind for styling, ensure vertical alignment with input
                    className="px-4 py-2 bg-canada-red text-white rounded-r-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-canada-red focus:ring-offset-1 h-[calc(2.5rem+2px)]" // Match height (py-2 + border)
                >
                    {t('searchButtonText')} 
                </button>
            </div>

            {/* Group 2: Category Filter - ALWAYS horizontal row */}
            <div className="flex items-center gap-2"> {/* Reverted to always flex-row */}
                <label 
                    htmlFor="category-preview" 
                    className={`${styles.sortLabel} whitespace-nowrap`} // Removed mobile margin
                >
                    {t('categoryLabel')}
                </label>
                <select 
                    id="category-preview" 
                    value={selectedCategory} 
                    onChange={handleCategoryChange} 
                    // Use Tailwind for padding, border, rounded corners + ADDED WIDTH
                    className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent"
                >
                    <option value="">{t('allCategoriesOption')}</option>
                    {categories.map(cat => {
                        const translatedCat = tCat(cat);
                        return (
                            <option key={cat} value={cat}>
                                {translatedCat === cat ? cat : translatedCat}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Group 3: Sort Dropdown - ALWAYS horizontal row */}
            <div className="flex items-center gap-2"> {/* Reverted to always flex-row */}
                <label 
                    htmlFor="sort-preview" 
                    className={`${styles.sortLabel} whitespace-nowrap`} // Removed mobile margin
                >
                    {t('sortByLabel')}
                </label>
                <select 
                    id="sort-preview" 
                    value={sortBy} 
                    onChange={handleSortChange} 
                    // Use Tailwind for padding, border, rounded corners
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent"
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
