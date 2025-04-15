import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Define props interface
interface ViewMoreProductsLinkProps {
  searchTerm?: string;
  selectedCategory?: string;
  sortBy?: 'liked' | 'rated' | 'reviewed';
}

const ViewMoreProductsLink: React.FC<ViewMoreProductsLinkProps> = ({ 
  searchTerm, 
  selectedCategory, 
  sortBy 
}) => {
    const t = useTranslations('ProductSearchPage'); // Assuming key will be added here

    // Construct query parameters
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append('query', searchTerm);
    }
    if (selectedCategory) {
      params.append('category', selectedCategory);
    }
    if (sortBy) {
      params.append('sort', sortBy);
    }
    const queryString = params.toString();
    const href = `/product-search${queryString ? `?${queryString}` : ''}`;

    return (
        <div className="text-center mt-8 mb-8"> {/* Added margin bottom */}
            <Link 
                href={href} // Use dynamic href
                className="inline-block bg-canada-red text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
                {t('viewMoreLink')} {/* Use translation key */}
            </Link>
        </div>
    );
};

export default ViewMoreProductsLink;
