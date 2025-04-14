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

    // Use CSS Modules classes instead of inline styles
    return (
        // Use a form for better accessibility and handling Enter key
        <form 
            onSubmit={handleSearchSubmit} 
            className={`${styles.centeredSearchForm} ${className}`} // Use new centered class
            style={{ gap: '1.2rem' }} // Increased gap for more spacing between controls
        > 
            <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearchTermChange}
                className={styles.centeredSearchInput}
                aria-label={t('searchAriaLabel')}
                style={{ width: '450px' }} // Wider search box as requested
            />
            
            <button 
                type="submit" 
                className="btn-primary"
                style={{ 
                    padding: '0.5rem 1rem', 
                    height: 'calc(1.5em + 1.5rem + 2px)',
                    marginLeft: '0.5rem' // Add specific margin after search box
                }}
            >
                {t('searchButtonText')} 
            </button>

            {/* Category Filter Dropdown with spacing */}
            <label 
                htmlFor="category-preview" 
                className={styles.sortLabel}
                style={{ marginLeft: '1rem' }} // Add more margin before label
            >
                {t('categoryLabel')}
            </label>
            <select 
                id="category-preview" 
                value={selectedCategory} 
                onChange={handleCategoryChange} 
                className={styles.sortSelect}
            >
                <option value="">{t('allCategoriesOption')}</option>
                {categories.map(cat => {
                    const translatedCat = tCat(cat);
                    // If translation returns the key itself, display the key (original name)
                    // Otherwise, display the translation
                    return (
                        <option key={cat} value={cat}>
                            {translatedCat === cat ? cat : translatedCat}
                        </option>
                    );
                })}
            </select>

            {/* Sort Dropdown with spacing */}
            <label 
                htmlFor="sort-preview" 
                className={styles.sortLabel}
                style={{ marginLeft: '1rem' }} // Add more margin before label
            >
                {t('sortByLabel')}
            </label>
            <select 
                id="sort-preview" 
                value={sortBy} 
                onChange={handleSortChange} 
                className={styles.sortSelect}
            >
                <option value="liked">{t('sortByLiked')}</option>
                <option value="rated">{t('sortByRated')}</option>
                <option value="reviewed">{t('sortByReviewed')}</option>
            </select>
        </form>
    );
};

export default SearchControlsPreview;
