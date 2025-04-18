import React from 'react';
import Image, { StaticImageData } from 'next/image'; // Added StaticImageData
import { useTranslations } from 'next-intl';
import styles from './ProductSearch.module.css'; // Use the moved CSS module
import productOfCanadaImage from '/public/images/ProductOfCanada.png'; // Import the ad image

// Define the structure of a product (matching the hook's definition)
interface ProductPreview {
    id: number;
    asin: string | null;
    title: string | null;
    brand: string | null;
    stars: number | null;
    reviews_count: number | null;
    thumbnail_image: string | null;
    url: string | null;
    like_count: number | null;
}

interface ProductGridPreviewProps {
    products: ProductPreview[];
    isLoading: boolean;
    error: string | null;
    // No likedProducts or handleLikeClick needed for preview
}

const AFFILIATE_TAG = 'tag=canscanapp-20'; // Keep consistent

// Function to append affiliate tag (can be moved to a utils file later)
const getAffiliateUrl = (baseUrl: string | null): string => {
    if (!baseUrl) return '#';
    try {
        const url = new URL(baseUrl);
        url.searchParams.set('tag', AFFILIATE_TAG.split('=')[1]);
        return url.toString();
    } catch (e) {
        console.error("Invalid product URL:", baseUrl, e);
        return baseUrl.includes('?') ? `${baseUrl}&${AFFILIATE_TAG}` : `${baseUrl}?${AFFILIATE_TAG}`;
    }
};

const ProductGridPreview: React.FC<ProductGridPreviewProps> = ({ products, isLoading, error }) => {
    const t = useTranslations('ProductSearchPage'); // Use the consolidated namespace

    if (isLoading) {
        // Use the skeleton loader instead of simple text
        return (
            <div className={styles.skeletonGrid}>
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={styles.skeletonCard}>
                        <div className={styles.skeletonHeader}>
                            <div className={styles.skeletonHeaderContent}></div>
                        </div>
                        <div className={styles.skeletonImage}></div>
                        <div className={styles.skeletonTitle}></div>
                        <div className={styles.skeletonStats}></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className={styles.error}>{t('errorPrefix')} {error}</div>;
    }

    if (products.length === 0) {
        // Don't show "no results" on initial homepage load, maybe show nothing or a placeholder
        return null; 
        // Or return <div className={styles.noResults}>{t('noResultsFound')}</div>; if preferred
    }

    // Define the static ad card data
    const adCard = {
        id: 'ad-card', // Unique key for the ad
        href: "mailto:advertise@canscanapp.ca",
        brand: "Your Business Name",
        image: productOfCanadaImage,
        alt: "Advertise your product here",
        title: "Advertise Your Product Here",
        rating: "5.0",
        reviews: "100 reviews" // Example reviews
    };

    return (
        <div className={styles.resultsGrid}>
            {/* Static Ad Card */}
            <a 
                key={adCard.id}
                href={adCard.href}
                className={styles.productCard} // Reuse existing card styles
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className={styles.productBrandHeader}>
                    {adCard.brand}
                    {/* Display static like count */}
                    <span className={styles.likeCount}>
                       42
                   </span>
                   {/* Display static heart icon */}
                   <div className={styles.productLikes} style={{ pointerEvents: 'none' }}>
                       <span className={styles.likeButton}>
                           ❤️
                       </span>
                   </div>
                </div>
                <div className={styles.productImageContainer}>
                    <Image
                        src={adCard.image}
                        alt={adCard.alt} 
                        width={200}
                        height={180}
                        className={styles.productImage}
                        placeholder="blur" // Optional: add blur placeholder
                    />
                </div>
                <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{adCard.title}</h3>
                    <div className={styles.productStats}>
                        <div className={styles.productStars} title={`Rating: ${adCard.rating}`}>
                             <span style={{ marginRight: '4px' }}>{adCard.rating}</span>
                            <div className={styles.starRating}>
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>★</span> // Full stars for ad
                                ))}
                            </div>
                        </div>
                        <span className={styles.productReviews} title="Reviews">
                            {adCard.reviews}
                        </span>
                    </div>
                </div>
            </a>

            {/* Dynamic Product Cards */}
            {products.map((product) => {
                // Calculate stars for display
                const starRating = product.stars ? Math.round(product.stars) : 0;
                const starRatingExact = product.stars?.toFixed(1) || '0.0';

                return (
                    <a
                        key={product.id}
                        href={getAffiliateUrl(product.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.productCard}
                    >
                        {/* Brand Header - Add like count and icon */}
                        {product.brand && product.brand.trim() !== '' && (
                            <div className={styles.productBrandHeader}>
                                {product.brand}
                                {/* Display like count */}
                                <span className={styles.likeCount}>
                                    {product.like_count || 0}
                                </span>
                                {/* Display static heart icon */}
                                <div className={styles.productLikes} style={{ pointerEvents: 'none' }}> {/* Make non-interactive */}
                                    <span className={styles.likeButton}>
                                        ❤️
                                    </span>
                                </div>
                            </div>
                        )}
                        {/* If no brand, still show like count/icon */}
                        {(!product.brand || product.brand.trim() === '') && (
                             <>
                                <span className={styles.likeCount} style={{ top: '8px', color: '#D90000' }}> {/* Adjust color if needed */}
                                    {product.like_count || 0}
                                </span>
                                <div className={styles.productLikes} style={{ pointerEvents: 'none', top: '8px' }}>
                                    <span className={styles.likeButton}>
                                        ❤️
                                    </span>
                                </div>
                             </>
                        )}

                        {/* Product Image Container */}
                        <div className={styles.productImageContainer}>
                            <Image
                                src={product.thumbnail_image || '/placeholder.png'}
                                alt={t('productImageAlt')}
                                width={200}
                                height={180}
                                className={styles.productImage}
                                onError={(e) => { e.currentTarget.src = '/placeholder.png'; }}
                            />
                        </div>

                        {/* Product Info */}
                        <div className={styles.productInfo}>
                            <h3 className={styles.productTitle}>{product.title || 'No Title'}</h3>
                            <div className={styles.productStats}>
                                <div className={styles.productStars} title={`${t('ratingTitlePrefix')} ${starRatingExact}`}>
                                    <div className={styles.starRating}>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < starRating ? '' : styles.emptyStar}>★</span>
                                        ))}
                                    </div>
                                    <span style={{ marginLeft: '4px' }}>{starRatingExact}{t('starsSuffix')}</span>
                                </div>
                                <span className={styles.productReviews} title={t('reviewsTitle')}>
                                    {product.reviews_count?.toLocaleString() ?? '0'}{t('reviewsSuffix')}
                                </span>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
};

export default ProductGridPreview;
