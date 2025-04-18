'use client'; // Directive must be at the top for client components

import React, { useState, useEffect, useCallback, ChangeEvent, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styles from '@/components/ProductSearch.module.css'; // Adjust path if needed
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import productOfCanadaImage from '/public/images/ProductOfCanada.png'; // Adjust path if needed
import SearchControlsPreview from './SearchControlsPreview'; // Import the controls component
import CategoryMenu from './CategoryMenu'; // Import the new CategoryMenu component

// --- Interfaces ---
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

interface CategoryNode {
  name: string;
  children: CategoryNode[];
  productCount?: number; // Add optional product count
}

// --- Constants ---
const ITEMS_PER_PAGE = 20;
const AFFILIATE_TAG = 'tag=canscanapp-20';
const LIKED_PRODUCTS_STORAGE_KEY = 'likedAmazonProducts';
const MAX_CATEGORY_LEVELS = 3; // How many levels of dropdowns to show

// --- Debounce Utility ---
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

// --- Client Component Logic ---
export default function ProductSearchPageClient() {
    const t = useTranslations('ProductSearchPage');
    const searchParams = useSearchParams();

    // --- State Variables ---
    // Search & Sort
    const initialQuery = searchParams.get('query') || '';
    const initialSort = (searchParams.get('sort') as 'liked' | 'rated' | 'reviewed') || 'liked';
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialQuery);
    const [sortBy, setSortBy] = useState<'liked' | 'rated' | 'reviewed'>(initialSort);

    // Categories
    const initialCategoryString = searchParams.get('category') || '';
    const initialCategoryPath = initialCategoryString ? initialCategoryString.split(' > ') : [];
    const paddedInitialPath = [...initialCategoryPath];
    while (paddedInitialPath.length < MAX_CATEGORY_LEVELS) {
        paddedInitialPath.push('');
    }
    const [categoryTree, setCategoryTree] = useState<CategoryNode[]>([]); // Holds the full tree
    const [selectedCategories, setSelectedCategories] = useState<string[]>(paddedInitialPath); // Initialize from URL
    const [categoryOptions, setCategoryOptions] = useState<CategoryNode[][]>(Array(MAX_CATEGORY_LEVELS).fill([])); // Options for each dropdown

    // Products & Loading
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Likes & Infinite Scroll
    const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
    const observer = useRef<IntersectionObserver | null>(null);
    const isFetching = useRef(false); // Prevent concurrent fetches

    // --- Effects ---
    // Initial setup: scroll to top, load likes
    useEffect(() => {
        window.scrollTo(0, 0);
        try {
            const storedLikes = localStorage.getItem(LIKED_PRODUCTS_STORAGE_KEY);
            if (storedLikes) {
                setLikedProducts(new Set(JSON.parse(storedLikes)));
            }
        } catch (e) {
            console.error("Failed to load liked products from localStorage", e);
        }
    }, []);

    // Save likes to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(LIKED_PRODUCTS_STORAGE_KEY, JSON.stringify(Array.from(likedProducts)));
        } catch (e) {
            console.error("Failed to save liked products to localStorage", e);
        }
    }, [likedProducts]);

    // Fetch category tree on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/getAmazonCategories');
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                const tree: CategoryNode[] = data.categories || [];
                setCategoryTree(tree);
                // Initialize category options based on initial path from URL
                const initialOptions: CategoryNode[][] = Array(MAX_CATEGORY_LEVELS).fill([]);
                initialOptions[0] = tree; // Level 1 is always the full tree
                let currentNode = { name: 'root', children: tree };
                for (let i = 0; i < paddedInitialPath.length -1; i++) { // Iterate up to the second-to-last level selected
                    const categoryName = paddedInitialPath[i];
                    if (categoryName) {
                        const nextNode = currentNode.children.find(node => node.name === categoryName);
                        if (nextNode && nextNode.children) {
                            currentNode = nextNode;
                            initialOptions[i + 1] = nextNode.children; // Set options for the next level
                        } else {
                            break; // Stop if node not found or has no children
                        }
                    } else {
                        break; // Stop if path is incomplete
                    }
                }
                setCategoryOptions(initialOptions); // Set the calculated initial options

            } catch (err) {
                console.error("Error fetching categories:", err);
                setError(err instanceof Error ? err.message : "Failed to load categories.");
            }
        };
        fetchCategories();
    }, []);

    // Debounce search term changes
    const debouncedSetSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearchTerm(value);
            setProducts([]); // Reset products on new search
            setCurrentPage(1);
            setHasMore(true);
            setError(null);
            isFetching.current = false;
        }, 500),
        [] // No dependencies needed for debounce itself
    );

    // Derive the category path to use for filtering API calls
    const categoryFilterPath = useMemo(() => {
        let path = '';
        for (let i = 0; i < MAX_CATEGORY_LEVELS; i++) {
            if (selectedCategories[i]) {
                path = path ? `${path} > ${selectedCategories[i]}` : selectedCategories[i];
            } else {
                break; // Stop if a level is not selected
            }
        }
        return path;
    }, [selectedCategories]);

    // Fetch products when filters change (debounced search, sort, category path)
    useEffect(() => {
        // Define fetch logic inside useEffect or useCallback to capture current state
        const fetchInitialPage = async () => {
            if (isFetching.current) return; // Prevent race conditions
            isFetching.current = true;
            setIsLoading(true); // Show initial loading indicator
            setError(null);

            const params = new URLSearchParams();
            if (debouncedSearchTerm) params.append('query', debouncedSearchTerm);
            if (categoryFilterPath) params.append('category', categoryFilterPath); // Use derived path
            params.append('sortBy', sortBy);
            params.append('page', '1'); // Always fetch page 1 on filter change

            try {
                const response = await fetch(`/api/searchAmazonProducts?${params.toString()}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const fetchedProducts: Product[] = data.products || [];
                setProducts(fetchedProducts); // Replace products
                setHasMore(fetchedProducts.length === ITEMS_PER_PAGE);
                setCurrentPage(1); // Reset page number
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Failed to fetch products.';
                setError(message);
                setProducts([]); // Clear products on error
                setHasMore(false);
            } finally {
                setIsLoading(false);
                isFetching.current = false;
            }
        };

        fetchInitialPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, sortBy, categoryFilterPath]); // Re-fetch when these change

    // Fetch more products for infinite scroll
    useEffect(() => {
        // Define fetch logic inside useEffect or useCallback
        const fetchNextPage = async () => {
            if (!hasMore || isFetching.current || isLoading) return; // Don't fetch if no more pages, already fetching, or initial load happening
            isFetching.current = true;
            setIsLoadingMore(true); // Show loading more indicator
            setError(null);

            const params = new URLSearchParams();
            if (debouncedSearchTerm) params.append('query', debouncedSearchTerm);
            if (categoryFilterPath) params.append('category', categoryFilterPath); // Use derived path
            params.append('sortBy', sortBy);
            params.append('page', currentPage.toString()); // Fetch the current page number

            try {
                const response = await fetch(`/api/searchAmazonProducts?${params.toString()}`);
                 if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const fetchedProducts: Product[] = data.products || [];

                setProducts(prevProducts => {
                    const existingIds = new Set(prevProducts.map(p => p.id));
                    const uniqueNewProducts = fetchedProducts.filter(p => !existingIds.has(p.id));
                    return [...prevProducts, ...uniqueNewProducts];
                });
                setHasMore(fetchedProducts.length === ITEMS_PER_PAGE);
            } catch (err: unknown) {
                 const message = err instanceof Error ? err.message : 'Failed to fetch more products.';
                 setError(message); // Show error, but don't clear existing products
                 setHasMore(false); // Stop fetching on error
            } finally {
                setIsLoadingMore(false);
                isFetching.current = false;
            }
        };

        // Only fetch if currentPage > 1 (initial load handled by other effect)
        if (currentPage > 1) {
            fetchNextPage();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]); // Triggered only by page changes from intersection observer

    // --- Handlers ---
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        debouncedSetSearch(newSearchTerm);
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value as 'liked' | 'rated' | 'reviewed';
        setSortBy(newSortBy);
        // Product refetch is handled by the useEffect watching sortBy
    };

    // New handleCategorySelect function to replace handleCategoryLevelChange
    const handleCategorySelect = (categoryPath: string[]) => {
        // Create a path filled with empty strings to match MAX_CATEGORY_LEVELS length
        const newSelectedCategories = [...categoryPath];
        
        // Pad with empty strings if needed
        while (newSelectedCategories.length < MAX_CATEGORY_LEVELS) {
            newSelectedCategories.push('');
        }
        
        // Trim if too long (shouldn't happen, but just in case)
        if (newSelectedCategories.length > MAX_CATEGORY_LEVELS) {
            newSelectedCategories.length = MAX_CATEGORY_LEVELS;
        }
        
        setSelectedCategories(newSelectedCategories);
        
        // Update category options for compatibility with existing code
        const newCategoryOptions = [categoryTree]; // First level is always the full tree
        
        // Calculate options for each level based on the selected path
        let currentNode = { name: 'root', children: categoryTree };
        for (let i = 0; i < categoryPath.length && i < MAX_CATEGORY_LEVELS - 1; i++) {
            if (categoryPath[i]) {
                const nextNode = currentNode.children.find(node => node.name === categoryPath[i]);
                if (nextNode) {
                    currentNode = nextNode;
                    newCategoryOptions[i + 1] = currentNode.children || [];
                } else {
                    // If node not found, clear subsequent levels
                    for (let j = i + 1; j < MAX_CATEGORY_LEVELS; j++) {
                        newCategoryOptions[j] = [];
                    }
                    break;
                }
            } else {
                // Empty selection, clear subsequent levels
                for (let j = i + 1; j < MAX_CATEGORY_LEVELS; j++) {
                    newCategoryOptions[j] = [];
                }
                break;
            }
        }
        
        setCategoryOptions(newCategoryOptions);
        // Product refetch is handled by the useEffect watching categoryFilterPath
    };

    // Infinite scroll observer setup
    const lastProductElementRef = useCallback((node: HTMLAnchorElement | null) => {
        if (isFetching.current || isLoading || isLoadingMore) return; // Don't observe if loading
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // console.log('Last element visible, loading more...');
                setCurrentPage(prevPage => prevPage + 1);
            }
        }, { rootMargin: "200px" }); // Load when 200px away from viewport bottom

        if (node) observer.current.observe(node);
    }, [hasMore, isLoading, isLoadingMore]); // Recreate observer if loading state or hasMore changes

    // Like button handler
    const handleLikeClick = async (productId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (likedProducts.has(productId)) return; // Prevent multiple clicks/updates

        // Optimistic UI update
        setLikedProducts(prev => new Set(prev).add(productId));
        setProducts(prev => prev.map(p =>
            p.id === productId ? { ...p, like_count: (p.like_count ?? 0) + 1 } : p
        ));

        // Actual backend update
        try {
            const { error: rpcError } = await supabase.rpc('increment_product_like', {
                product_id_to_like: productId
            });
            if (rpcError) throw rpcError; // Throw error to be caught below
        } catch (err) {
            console.error("Failed to increment like count:", err);
            // Revert optimistic update on error
            setLikedProducts(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, like_count: Math.max(0, (p.like_count ?? 1) - 1) } : p // Ensure count doesn't go below 0
            ));
            // Optionally show an error message to the user
        }
    };

    // Affiliate URL helper
    const getAffiliateUrl = (baseUrl: string | null): string => {
        if (!baseUrl) return '#'; // Return a safe fallback
        try {
            const url = new URL(baseUrl);
            url.searchParams.set('tag', AFFILIATE_TAG.split('=')[1]);
            return url.toString();
        } catch (e) {
            // Handle cases where baseUrl might not be a valid URL initially
            return baseUrl.includes('?') ? `${baseUrl}&${AFFILIATE_TAG}` : `${baseUrl}?${AFFILIATE_TAG}`;
        }
    };

    // --- Render Logic ---
    return (
        <>
            {/* Page Header */}
            <section className="bg-gradient-to-br from-canada-red to-red-700 py-16 md:py-24 relative">
                {/* Border lines */}
                <div className="w-full border-t-2 border-black absolute top-0 left-0 right-0 z-20"></div>
                <div className="w-full border-b-2 border-black absolute bottom-0 left-0 right-0 z-20"></div>
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('heroTitle')}</h1>
                        <p className="text-xl text-white text-opacity-90">{t('heroSubtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Search Controls */}
            <div className="mt-6 mb-4 px-4">
                <form
                    className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-6"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {/* Search Input */}
                    <div className="flex items-center w-full md:w-auto">
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-canada-red focus:border-transparent flex-grow md:w-80 lg:w-96"
                            aria-label={t('searchAriaLabel')}
                            style={{ minWidth: '150px' }}
                        />
                    </div>

                    {/* Category Menu - New Component */}
                    <CategoryMenu 
                        categoryTree={categoryTree}
                        selectedCategoryPath={selectedCategories.filter(Boolean)} // Only pass non-empty categories
                        onCategorySelect={handleCategorySelect}
                        className="w-full md:w-auto"
                    />

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
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
            </div>

            {/* Results Area */}
            <div className={styles.container}>
                 <div className={styles.disclaimer}>
                    {t('affiliateDisclaimer')}
                </div>

                {/* Loading and Error States */}
                {isLoading && (
                    <div className={styles.skeletonGrid}>
                        {[...Array(8)].map((_, i) => (
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
                )}
                {error && !isLoading && <div className={styles.error}>{t('errorPrefix')} {error}</div>}
                {!isLoading && !error && products.length === 0 && (debouncedSearchTerm || categoryFilterPath) && (
                    <div className={styles.noResults}>{t('noResultsFound')}</div>
                )}

                {/* Products Grid */}
                {!isLoading && (
                    <div className={styles.resultsGrid}>
                        {/* Placeholder/Ad Card */}
                        <a
                            href="mailto:advertise@canscanapp.ca"
                            className={styles.productCard}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* ... Ad card content ... */}
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

                        {/* Product Cards */}
                        {products.map((product, index) => {
                            const isLiked = likedProducts.has(product.id);
                            const ref = (index === products.length - 1) ? lastProductElementRef : null;
                            const starRating = product.stars ? Math.round(product.stars) : 0;
                            const starRatingExact = product.stars?.toFixed(1) || '0.0';

                            return (
                                <a key={product.id} ref={ref} href={getAffiliateUrl(product.url)} target="_blank" rel="noopener noreferrer" className={styles.productCard}>
                                    {/* Brand Header with Like Button */}
                                    <div className={styles.productBrandHeader}>
                                        {product.brand || <span style={{ visibility: 'hidden' }}>Placeholder</span>} {/* Render brand or placeholder */}
                                        <span className={styles.likeCount}>{product.like_count || 0}</span>
                                        <button onClick={(e) => handleLikeClick(product.id, e)} disabled={isLiked} className={styles.productLikes} aria-label={isLiked ? t('likeButtonAriaLiked') : t('likeButtonAriaNotLiked')} title={isLiked ? t('likeButtonTitleLiked') : t('likeButtonTitleNotLiked')}>
                                            <span className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}>❤️</span>
                                        </button>
                                    </div>
                                    {/* Image */}
                                    <div className={styles.productImageContainer}>
                                        <Image src={product.thumbnail_image || '/placeholder.png'} alt={t('productImageAlt', { title: product.title || 'Product' })} width={200} height={180} className={styles.productImage} onError={(e) => { e.currentTarget.src = '/placeholder.png'; }} />
                                    </div>
                                    {/* Info */}
                                    <div className={styles.productInfo}>
                                        <h3 className={styles.productTitle}>{product.title || 'No Title'}</h3>
                                        <div className={styles.productStats}>
                                            {/* Stars */}
                                            <div className={styles.productStars} title={`${t('ratingTitlePrefix')} ${starRatingExact}`}>
                                                <span style={{ marginRight: '4px' }}>{starRatingExact}</span>
                                                <div className={styles.starRating}>
                                                    {[...Array(5)].map((_, i) => (<span key={i} className={i < starRating ? '' : styles.emptyStar}>★</span>))}
                                                </div>
                                            </div>
                                            {/* Reviews */}
                                            <span className={styles.productReviews} title={t('reviewsTitle')}>{product.reviews_count?.toLocaleString() ?? '0'} {t('reviewsSuffix')}</span>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* Loading More Indicator */}
                {isLoadingMore && (
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
                )}

                {/* End of Results Message */}
                {!isLoading && !isLoadingMore && !hasMore && products.length > 0 && (
                    <div className={styles.noResults}>{t('noMoreResults')}</div>
                )}
            </div>
        </>
    );
}
