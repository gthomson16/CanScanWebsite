import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ViewMoreProductsLink = () => {
    const t = useTranslations('ProductSearchPage'); // Assuming key will be added here

    return (
        <div className="text-center mt-8 mb-8"> {/* Added margin bottom */}
            <Link 
                href="/product-search" 
                className="inline-block bg-canada-red text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
                {t('viewMoreLink')} {/* Use translation key */}
            </Link>
        </div>
    );
};

export default ViewMoreProductsLink;
