import { useState, useEffect, useCallback, ChangeEvent } from 'react'; // Added ChangeEvent
// Removed supabase import as it's not directly used here for types anymore

// Define the structure of a product (can be shared or redefined)
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

const ITEMS_PER_PREVIEW = 3; // Number of items for the homepage preview row (excluding ad card) - Changed from 4

export function useProductSearchPreview() {
    const [searchTerm, setSearchTerm] = useState(''); // State for the input value
    const [submittedSearchTerm, setSubmittedSearchTerm] = useState(''); // State for term used in fetch
    const [sortBy, setSortBy] = useState<'liked' | 'rated' | 'reviewed'>('liked');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [productsPreview, setProductsPreview] = useState<ProductPreview[]>([]);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [errorPreview, setErrorPreview] = useState<string | null>(null);

    // Fetch categories on initial mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/getAmazonCategories');
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (err) {
                console.error("Error fetching categories for preview:", err);
                // Optionally set an error state specific to categories if needed
            }
        };
        fetchCategories();
    }, []);

    // Fetch first page of products based on submitted search, category, and sort
    const fetchPreviewProducts = useCallback(async () => {
        setIsLoadingPreview(true);
        setErrorPreview(null);
        console.log(`Fetching preview products for search: "${submittedSearchTerm}", category: "${selectedCategory}", sort by: ${sortBy}`);

        try {
            const params = new URLSearchParams();
            // Use submittedSearchTerm for the query
            if (submittedSearchTerm) params.append('query', submittedSearchTerm); 
            if (selectedCategory) params.append('category', selectedCategory);
            params.append('sortBy', sortBy);
            params.append('page', '1'); // Always fetch page 1

            const response = await fetch(`/api/searchAmazonProducts?${params.toString()}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Slice the results if the API doesn't support a limit param
            setProductsPreview((data.products || []).slice(0, ITEMS_PER_PREVIEW)); 
            // Note: The API returns 20 items, we slice to 4 for the preview row.
            console.log(`Fetched ${data.products?.length ?? 0} products, showing ${ITEMS_PER_PREVIEW} in preview.`);

        } catch (err: unknown) {
            console.error("Failed to fetch preview products:", err);
            const message = err instanceof Error ? err.message : 'Failed to fetch preview products.';
            setErrorPreview(message);
            setProductsPreview([]); // Clear products on error
        } finally {
            setIsLoadingPreview(false);
        }
    // Removed productsPreview.length dependency, fetch triggered by submittedSearchTerm instead
    }, [selectedCategory, sortBy, submittedSearchTerm]); 

    // Effect to trigger fetch when submitted term, category, or sort changes
    useEffect(() => {
        fetchPreviewProducts();
    // fetchPreviewProducts dependency includes submittedSearchTerm, selectedCategory, sortBy
    }, [fetchPreviewProducts]); 

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as 'liked' | 'rated' | 'reviewed');
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    // Handler for search input change
    const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Handler for search button click or form submission
    const handleSearchSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault(); // Prevent default form submission if used in a form
        setSubmittedSearchTerm(searchTerm); // Trigger fetch by updating submitted term
    };


    return {
        searchTerm, // Export current input value
        handleSearchTermChange, // Export input handler
        handleSearchSubmit, // Export submit handler
        categories,
        selectedCategory,
        handleCategoryChange,
        sortBy,
        handleSortChange,
        productsPreview,
        isLoadingPreview,
        errorPreview,
        submittedSearchTerm, // Export the submitted term as well
    };
}
