'use client'; // Directive must be at the top for client components

import React, { useState, useEffect, useCallback, ChangeEvent, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styles from '@/components/ProductSearch.module.css'; // Adjust path if needed
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import productOfCanadaImage from '/public/images/ProductOfCanada.png'; // Adjust path if needed

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
    like_count: number | null;
}

// Debounce function utility
function debounce<Params extends unknown[]>(
    func: (...args: Params) => void,
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

// This is the actual client component logic
export default function ProductSearchPageClient() {
    const t = useTranslations('ProductSearchPage');
    const tCat = useTranslations('AmazonCategories');
    const searchParams = useSearchParams();

    const initialQuery = searchParams.get('query') || '';
    const initialCategory = searchParams.get('category') || '';
    const initialSort = (searchParams.get('sort') as 'liked' | 'rated' | 'reviewed') || 'liked';

    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery);
    const [sortBy, setSortBy] = useState<'liked' | 'rated' | 'reviewed'>(initialSort);
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [categories, setCategories] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

    const observer = useRef<IntersectionObserver | null>(null);
    const isFetching = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    useEffect(() => {
        try {
            localStorage.setItem(LIKED_PRODUCTS_STORAGE_KEY, JSON.stringify(Array.from(likedProducts)));
        } catch (e) {
            console.error("Failed to save liked products to localStorage", e);
        }
    }, [likedProducts]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/getAmazonCategories');
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const debouncedSetSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearchTerm(value);
            setProducts([]);
            setCurrentPage(1);
            setHasMore(true);
            setError(null);
            isFetching.current = false;
        }, 500),
        // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        debouncedSetSearch(newSearchTerm);
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value as 'liked' | 'rated' | 'reviewed';
        setSortBy(newSortBy);
        setProducts([]);
        setCurrentPage(1);
        setHasMore(true);
        setError(null);
        isFetching.current = false;
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        setProducts([]);
        setCurrentPage(1);
        setHasMore(true);
        setError(null);
        isFetching.current = false;
    };

    const fetchPage = useCallback(async (pageToFetch: number) => {
        if (isFetching.current) {
            return { fetchedProducts: [], newHasMore: hasMore };
        }
        isFetching.current = true;
        setError(null);

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
            if (selectedCategory) params.append('category', selectedCategory);
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
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to fetch products.';
            setError(message);
            newHasMore = false;
        }
        return { fetchedProducts, newHasMore };
    }, [debouncedSearchTerm, sortBy, hasMore, selectedCategory]);

    useEffect(() => {
        fetchPage(1).then(({ fetchedProducts, newHasMore }) => {
            setProducts(fetchedProducts);
            setHasMore(newHasMore);
        }).finally(() => {
             setIsLoading(false);
             isFetching.current = false;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, sortBy, selectedCategory]);

    useEffect(() => {
        if (currentPage > 1 && hasMore) {
            fetchPage(currentPage).then(({ fetchedProducts, newHasMore }) => {
                setProducts(prevProducts => {
                    const existingIds = new Set(prevProducts.map(p => p.id));
                    const uniqueNewProducts = fetchedProducts.filter((p: Product) => !existingIds.has(p.id));
                    return [...prevProducts, ...uniqueNewProducts];
                });
                setHasMore(newHasMore);
            }).finally(() => {
                setIsLoadingMore(false);
                isFetching.current = false;
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

     const lastProductElementRef = useCallback((node: HTMLAnchorElement | null) => {
        if (isFetching.current) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !isFetching.current) {
                observer.current?.disconnect();
                setCurrentPage(prevPage => prevPage + 1);
            }
        }, { rootMargin: "200px" });

        if (node) observer.current.observe(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore]);

    const handleLikeClick = async (productId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (likedProducts.has(productId)) return;

        setLikedProducts(prev => new Set(prev).add(productId));
        setProducts(prev => prev.map(p =>
            p.id === productId ? { ...p, like_count: (p.like_count ?? 0) + 1 } : p
        ));

        try {
            const { error: rpcError } = await supabase.rpc('increment_product_like', {
                product_id_to_like: productId
            });
            if (rpcError) throw rpcError;
        } catch (err) {
            console.error("Failed to increment like count (raw error):", err);
            setLikedProducts(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, like_count: (p.like_count ?? 1) - 1 } : p
            ));
        }
    };

    const getAffiliateUrl = (baseUrl: string | null): string => {
        if (!baseUrl) return '#';
        try {
            const url = new URL(baseUrl);
            url.searchParams.set('tag', AFFILIATE_TAG.split('=')[1]);
            return url.toString();
        } catch (e) {
            return baseUrl.includes('?') ? `${baseUrl}&${AFFILIATE_TAG}` : `${baseUrl}?${AFFILIATE_TAG}`;
        }
    };

    const getCategoryTranslation = (category: string) => {
        try {
            return category;
        } catch (e) {
            return category;
        }
    };

    // JSX rendering logic remains the same as it was in the original file's client part
    return (
        <>
            {/* Page Header */}
            <section className="bg-gradient-to-br from-canada-red to-red-700 py-16 md:py-24 relative">
                <div className="w-full border-t-2 border-black absolute top-0 left-0 right-0 z-20"></div>
                <div className="w-full border-b-2 border-black absolute bottom-0 left-0 right-0 z-20"></div>
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('heroTitle')}</h1>
                        <p className="text-xl text-white text-opacity-90">{t('heroSubtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Main Search Content */}
            {/* Apply similar responsive flex layout as the preview */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 mb-4 px-4`}>
                 {/* Group 1: Search Input (No button here, but keep structure similar) */}
                 <div className="flex items-center w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        // Apply Tailwind classes for styling and responsive width
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent flex-grow md:w-96" // Added md:w-96
                        aria-label={t('searchAriaLabel')}
                        style={{ minWidth: '200px' }}
                    />
                    {/* No submit button needed here as search is debounced */}
                 </div>

                 {/* Group 2: Category Filter - ALWAYS horizontal row */}
                 <div className="flex items-center gap-2">
                    <label
                        htmlFor="category"
                        className={`${styles.sortLabel} whitespace-nowrap`}
                    >
                        {t('categoryLabel')}
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        // Apply Tailwind classes + width
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
                 <div className="flex items-center gap-2">
                    <label
                        htmlFor="sort"
                        className={`${styles.sortLabel} whitespace-nowrap`}
                    >
                        {t('sortByLabel')}
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={handleSortChange}
                        // Apply Tailwind classes
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent"
                    >
                        <option value="liked">{t('sortByLiked')}</option>
                        <option value="rated">{t('sortByRated')}</option>
                        <option value="reviewed">{t('sortByReviewed')}</option>
                    </select>
                 </div>
            </div>

            {/* Container for results grid and messages */}
            <div className={styles.container}>
                 <div className={styles.disclaimer}>
                    As an Amazon Associate, we earn from qualifying purchases. Some products shown may earn us a commission.
                </div>

                {isLoading && <div className={styles.loading}>{t('loadingInitial')}</div>}
                {error && !isLoading && <div className={styles.error}>{t('errorPrefix')} {error}</div>}

                {/* Only show "No results found" when a search/filter is active and yields no results */}
                {!isLoading && !error && products.length === 0 && (debouncedSearchTerm || selectedCategory) && (
                    <div className={styles.noResults}>{t('noResultsFound')}</div>
                )}
                 {/* Removed the initial "no results" message block */}

                {!isLoading && (
                    <div className={styles.resultsGrid}>
                        <a 
                            href="mailto:advertise@canscanapp.ca"
                            className={styles.productCard}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className={styles.productBrandHeader}>
                                Your Business Name
                                <span className={styles.likeCount}>42</span>
                                <button onClick={(e) => { e.preventDefault(); }} className={styles.productLikes} aria-label="Example like button" title="Example like button">
                                    <span className={styles.likeButton}>❤️</span>
                                </button>
                            </div>
                            <div className={styles.productImageContainer}>
                                <Image src={productOfCanadaImage} alt="Example business product" width={200} height={180} className={styles.productImage} onError={(e) => { e.currentTarget.src = '/placeholder.png'; }} />
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productTitle}>Advertise Your Product Here</h3>
                                <div className={styles.productStats}>
                                    <div className={styles.productStars} title="Example rating">
                                        <span style={{ marginRight: '4px' }}>5.0</span>
                                        <div className={styles.starRating}>
                                            {[...Array(5)].map((_, i) => (<span key={i}>★</span>))}
                                        </div>
                                    </div>
                                    <span className={styles.productReviews} title="Example reviews">100 reviews</span>
                                </div>
                            </div>
                        </a>
                        
                        {products.length > 0 && products.map((product, index) => {
                            const isLiked = likedProducts.has(product.id);
                            const ref = (index === products.length - 1) ? lastProductElementRef : null;
                            const starRating = product.stars ? Math.round(product.stars) : 0;
                            const starRatingExact = product.stars?.toFixed(1) || '0.0';

                            return (
                                <a key={product.id} ref={ref} href={getAffiliateUrl(product.url)} target="_blank" rel="noopener noreferrer" className={styles.productCard}>
                                    {product.brand && product.brand.trim() !== '' && (
                                        <div className={styles.productBrandHeader}>
                                            {product.brand}
                                            <span className={styles.likeCount}>{product.like_count || 0}</span>
                                            <button onClick={(e) => { handleLikeClick(product.id, e); }} disabled={isLiked} className={styles.productLikes} aria-label={isLiked ? t('likeButtonAriaLiked') : t('likeButtonAriaNotLiked')} title={isLiked ? t('likeButtonTitleLiked') : t('likeButtonTitleNotLiked')}>
                                                <span className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}>❤️</span>
                                            </button>
                                        </div>
                                    )}
                                    {(!product.brand || product.brand.trim() === '') && (
                                        <>
                                            <span className={styles.likeCount} style={{ top: '8px' }}>{product.like_count || 0}</span>
                                            <button onClick={(e) => { handleLikeClick(product.id, e); }} disabled={isLiked} className={styles.productLikes} aria-label={isLiked ? t('likeButtonAriaLiked') : t('likeButtonAriaNotLiked')} title={isLiked ? t('likeButtonTitleLiked') : t('likeButtonTitleNotLiked')} style={{ top: '8px' }}>
                                                <span className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}>❤️</span>
                                            </button>
                                        </>
                                    )}
                                    <div className={styles.productImageContainer}>
                                        <Image src={product.thumbnail_image || '/placeholder.png'} alt={t('productImageAlt')} width={200} height={180} className={styles.productImage} onError={(e) => { e.currentTarget.src = '/placeholder.png'; }} />
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h3 className={styles.productTitle}>{product.title || 'No Title'}</h3>
                                        <div className={styles.productStats}>
                                            <div className={styles.productStars} title={`${t('ratingTitlePrefix')} ${starRatingExact}`}>
                                                <span style={{ marginRight: '4px' }}>{starRatingExact}</span>
                                                <div className={styles.starRating}>
                                                    {[...Array(5)].map((_, i) => (<span key={i} className={i < starRating ? '' : styles.emptyStar}>★</span>))}
                                                </div>
                                            </div>
                                            <span className={styles.productReviews} title={t('reviewsTitle')}>{product.reviews_count?.toLocaleString() ?? '0'}{t('reviewsSuffix')}</span>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}

                {isLoadingMore && <div className={styles.loading}>{t('loadingMore')}</div>}
                {!isLoading && !isLoadingMore && !hasMore && products.length > 0 && (
                     <div className={styles.noResults}>{t('noMoreResults')}</div>
                )}
            </div>
        </>
    );
}
