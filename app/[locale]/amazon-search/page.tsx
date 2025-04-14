'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from './search.module.css';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient'; // Import Supabase client

// Define the structure of a product based on API response
interface Product {
    id: number;
    asin: string | null;
    title: string | null;
    brand: string | null;
    stars: number | null;
    reviews_count: number | null;
    thumbnail_image: string | null;
    url: string | null;
    like_count: number | null; // Corrected property name
}

// Debounce function utility - Using a common generic pattern that satisfies ESLint
function debounce<Params extends unknown[]>(
    func: (...args: Params) => void, // Changed return type to void as we don't use the promise resolve
    timeout: number,
): (...args: Params) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Params) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}


const ITEMS_PER_PAGE = 20;
const AFFILIATE_TAG = 'tag=canscanapp-20';
const LIKED_PRODUCTS_STORAGE_KEY = 'likedAmazonProducts';

export default function AmazonSearchPage() {
    const t = useTranslations('AmazonSearch'); // Initialize translations

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'liked' | 'rated' | 'reviewed'>('liked');
    const [selectedCategory, setSelectedCategory] = useState<string>(''); // State for category filter
    const [categories, setCategories] = useState<string[]>([]); // State for available categories
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // For initial load/reset
    const [isLoadingMore, setIsLoadingMore] = useState(false); // For subsequent page loads
    const [error, setError] = useState<string | null>(null);
    const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

    const observer = useRef<IntersectionObserver | null>(null);
    const isFetching = useRef(false); // Ref to track if a fetch is in progress

    // Load liked products from localStorage on initial mount
    useEffect(() => {
        try {
            const storedLikes = localStorage.getItem(LIKED_PRODUCTS_STORAGE_KEY);
            if (storedLikes) {
                setLikedProducts(new Set(JSON.parse(storedLikes)));
            }
        } catch (e) {
            console.error("Failed to load liked products from localStorage", e);
        }
    }, []);

    // Update localStorage when likedProducts state changes
    useEffect(() => {
        try {
            localStorage.setItem(LIKED_PRODUCTS_STORAGE_KEY, JSON.stringify(Array.from(likedProducts)));
        } catch (e) {
            console.error("Failed to save liked products to localStorage", e);
        }
    }, [likedProducts]);

    // Fetch categories on initial mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/getAmazonCategories');
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
                // Handle error appropriately, maybe show a message
            }
        };
        fetchCategories();
    }, []);


    // Debounce the search term update
    const debouncedSetSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearchTerm(value);
            // Reset state fully for new search
            setProducts([]);
            setCurrentPage(1);
            setHasMore(true);
            setError(null);
            isFetching.current = false; // Reset fetch lock
        }, 500),
    []); // Added empty dependency array for useCallback

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        debouncedSetSearch(newSearchTerm);
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value as 'liked' | 'rated' | 'reviewed';
        setSortBy(newSortBy);
         // Reset state fully for new sort
        setProducts([]);
        setCurrentPage(1);
        setHasMore(true);
        setError(null);
        isFetching.current = false; // Reset fetch lock
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        // Reset state fully for new category filter
        setProducts([]);
        setCurrentPage(1);
        setHasMore(true);
        setError(null);
        isFetching.current = false; // Reset fetch lock
    };


    // --- Refactored Fetching Logic ---

    // Function to fetch products for a given page
    const fetchPage = useCallback(async (pageToFetch: number) => {
        // Prevent fetching if already in progress
        if (isFetching.current) {
            console.log(`Fetch attempt blocked for page ${pageToFetch}, already fetching.`);
            return { fetchedProducts: [], newHasMore: hasMore }; // Return current state if blocked
        }
        isFetching.current = true; // Set lock

        console.log(`Fetching page ${pageToFetch} for query: "${debouncedSearchTerm}", category: "${selectedCategory}", sort by: ${sortBy}`);
        setError(null); // Clear error before fetch

        // Set appropriate loading state
        if (pageToFetch === 1) {
            setIsLoading(true);
            setIsLoadingMore(false);
        } else {
            setIsLoadingMore(true);
        }

        let fetchedProducts: Product[] = [];
        let newHasMore = false;

        try {
            const params = new URLSearchParams();
            if (debouncedSearchTerm) params.append('query', debouncedSearchTerm);
            if (selectedCategory) params.append('category', selectedCategory); // Add category if selected
            params.append('sortBy', sortBy);
            params.append('page', pageToFetch.toString());

            const response = await fetch(`/api/searchAmazonProducts?${params.toString()}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            fetchedProducts = data.products || [];
            newHasMore = fetchedProducts.length === ITEMS_PER_PAGE;

            console.log(`Fetched ${fetchedProducts.length} products. HasMore: ${newHasMore}`);

        } catch (err: unknown) {
            console.error("Failed to fetch products:", err);
            const message = err instanceof Error ? err.message : 'Failed to fetch products.';
            setError(message);
            newHasMore = false; // Stop fetching on error
        } finally {
            // Reset loading states and release lock AFTER state updates below
            // isFetching.current = false; // Moved release after state updates
        }
        return { fetchedProducts, newHasMore };
    }, [debouncedSearchTerm, sortBy, hasMore, selectedCategory]); // Include selectedCategory

    // Effect for initial load OR when search/sort/category changes (resets to page 1)
    useEffect(() => {
        console.log("Effect triggered: Search term, sort, or category changed. Fetching page 1.");
        // State reset is handled by change handlers
        fetchPage(1).then(({ fetchedProducts, newHasMore }) => {
            setProducts(fetchedProducts);
            setHasMore(newHasMore);
        }).finally(() => {
             setIsLoading(false); // Ensure loading is off after initial fetch
             isFetching.current = false; // Release lock
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, sortBy, selectedCategory]); // Rerun when search/sort/category changes

    // Effect for loading subsequent pages (triggered by currentPage change)
    useEffect(() => {
        // Only run if it's not the first page and we expect more pages
        if (currentPage > 1 && hasMore) {
            console.log(`Effect triggered: Current page changed to ${currentPage}. Fetching.`);
            fetchPage(currentPage).then(({ fetchedProducts, newHasMore }) => {
                 // Filter out duplicates before appending
                setProducts(prevProducts => {
                    const existingIds = new Set(prevProducts.map(p => p.id));
                    const uniqueNewProducts = fetchedProducts.filter((p: Product) => !existingIds.has(p.id));
                    return [...prevProducts, ...uniqueNewProducts];
                });
                setHasMore(newHasMore);
            }).finally(() => {
                setIsLoadingMore(false); // Ensure loading more is off
                isFetching.current = false; // Release lock
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]); // Rerun *only* when currentPage changes (and is > 1)


     // Intersection Observer setup
     const lastProductElementRef = useCallback((node: HTMLAnchorElement | null) => {
        if (isFetching.current) return; // Don't attach if already fetching
        if (observer.current) observer.current.disconnect(); // Disconnect previous observer

        observer.current = new IntersectionObserver(entries => {
            // Ensure intersecting, hasMore, and not currently fetching
            if (entries[0].isIntersecting && hasMore && !isFetching.current) {
                console.log("IntersectionObserver triggered: Reached end, incrementing page...");
                // Disconnect observer before triggering state update to prevent rapid fire
                observer.current?.disconnect();
                setCurrentPage(prevPage => prevPage + 1);
            }
        }, { rootMargin: "200px" }); // Trigger earlier

        if (node) observer.current.observe(node); // Observe the new node
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore]); // Recreate observer only if hasMore changes


    // Handle Like Click
    const handleLikeClick = async (productId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (likedProducts.has(productId)) return;

        console.log(`Liking product ${productId}`);
        setLikedProducts(prev => new Set(prev).add(productId));
        setProducts(prev => prev.map(p =>
            p.id === productId ? { ...p, like_count: (p.like_count ?? 0) + 1 } : p // Corrected property name
        ));

        try {
            const { error: rpcError } = await supabase.rpc('increment_product_like', {
                product_id_to_like: productId
            });
            if (rpcError) throw rpcError;
            console.log(`Successfully incremented like for product ${productId}`);
        } catch (err) {
            console.error("Failed to increment like count (raw error):", err); // Log raw error object
            setLikedProducts(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, like_count: (p.like_count ?? 1) - 1 } : p // Corrected property name
            ));
        }
    };

    // Function to append affiliate tag
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

    return (
        <div className={styles.container}>
            <h1>{t('title')}</h1>

            <div className={styles.header}>
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                    aria-label={t('searchAriaLabel')}
                />
                <div className={styles.controls}>
                    {/* Category Filter Dropdown */}
                    <label htmlFor="category" className={styles.sortLabel}>{t('categoryLabel')}</label>
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange} className={styles.sortSelect}>
                        <option value="">{t('allCategoriesOption')}</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option> // Categories from DB are not translated here
                        ))}
                    </select>
                    {/* Sort Dropdown */}
                    <label htmlFor="sort" className={styles.sortLabel}>{t('sortByLabel')}</label>
                    <select id="sort" value={sortBy} onChange={handleSortChange} className={styles.sortSelect}>
                        <option value="liked">{t('sortByLiked')}</option>
                        <option value="rated">{t('sortByRated')}</option>
                        <option value="reviewed">{t('sortByReviewed')}</option>
                    </select>
                </div>
            </div>

            {/* Initial Loading Indicator */}
            {isLoading && <div className={styles.loading}>{t('loadingInitial')}</div>}
            {/* Error Display */}
            {error && !isLoading && <div className={styles.error}>{t('errorPrefix')} {error}</div>}

            {/* No Results Messages */}
            {!isLoading && !error && products.length === 0 && (debouncedSearchTerm || selectedCategory) && (
                <div className={styles.noResults}>{t('noResultsFound')}</div>
            )}
             {!isLoading && !error && products.length === 0 && !debouncedSearchTerm && !selectedCategory && (
                <div className={styles.noResults}>{t('noResultsInitial')}</div>
            )}

            {/* Results Grid */}
            {!isLoading && products.length > 0 && (
                <div className={styles.resultsGrid}>
                    {products.map((product, index) => {
                        const isLiked = likedProducts.has(product.id);
                        // Assign ref to the actual last element
                        const ref = (index === products.length - 1) ? lastProductElementRef : null;

                        // Calculate stars for display (whole number for stars, decimal for text)
                        const starRating = product.stars ? Math.round(product.stars) : 0;
                        const starRatingExact = product.stars?.toFixed(1) || '0.0';

                        return (
                            <a
                                key={product.id}
                                ref={ref}
                                href={getAffiliateUrl(product.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.productCard}
                            >
                                {/* Brand Header with Like Button inside */}
                                {product.brand && product.brand.trim() !== '' && (
                                    <div className={styles.productBrandHeader}>
                                        {product.brand}
                                        
                                        {/* Like Button positioned inside the header */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent following the link
                                                handleLikeClick(product.id, e);
                                            }}
                                            disabled={isLiked}
                                            className={styles.productLikes}
                                            aria-label={isLiked ? t('likeButtonAriaLiked') : t('likeButtonAriaNotLiked')}
                                            title={isLiked ? t('likeButtonTitleLiked') : t('likeButtonTitleNotLiked')}
                                        >
                                            <span className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}>
                                                ❤️
                                            </span>
                                        </button>
                                    </div>
                                )}

                                {/* If no brand, we still need the like button somewhere */}
                                {(!product.brand || product.brand.trim() === '') && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLikeClick(product.id, e);
                                        }}
                                        disabled={isLiked}
                                        className={styles.productLikes}
                                        aria-label={isLiked ? t('likeButtonAriaLiked') : t('likeButtonAriaNotLiked')}
                                        title={isLiked ? t('likeButtonTitleLiked') : t('likeButtonTitleNotLiked')}
                                        style={{ top: '8px' }} // Position at top when no header
                                    >
                                        <span className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}>
                                            ❤️
                                        </span>
                                    </button>
                                )}

                                {/* Product Image Container */}
                                <div className={styles.productImageContainer}>
                                    <Image
                                        src={product.thumbnail_image || '/placeholder.png'}
                                        alt={t('productImageAlt')} // Use generic alt text
                                        width={200}
                                        height={180}
                                        className={styles.productImage}
                                        onError={(e) => { e.currentTarget.src = '/placeholder.png'; }}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productTitle}>{product.title || 'No Title'}</h3>
                                    
                                    {/* Stars and Reviews - now with decimal rating */}
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
            )}

             {/* Loading indicator for infinite scroll */}
            {isLoadingMore && <div className={styles.loading}>{t('loadingMore')}</div>}
            {/* End of results message */}
            {!isLoading && !isLoadingMore && !hasMore && products.length > 0 && (
                 <div className={styles.noResults}>{t('noMoreResults')}</div>
            )}
        </div>
    );
}
