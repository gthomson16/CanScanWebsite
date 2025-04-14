import { NextRequest, NextResponse } from 'next/server';
import { supabase } from 'lib/supabaseClient'; // Updated import path

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const category = searchParams.get('category'); // Get optional category filter
  const sortBy = searchParams.get('sortBy') || 'liked'; // Default sort
  const page = parseInt(searchParams.get('page') || '1', 10); // Get page number, default to 1
  const limit = 20; // Items per page
  const offset = (page - 1) * limit; // Calculate offset

  try {
    let supabaseQuery = supabase
      .from('products_amazon')
      .select('id, asin, title, brand, stars, reviews_count, thumbnail_image, url, like_count'); // Corrected column name

    // Apply search filter if query exists
    if (query) {
      const searchTerm = `%${query}%`;
      // Search across title, brand, and description using OR condition
      // Using ilike for case-insensitive search. Handle potential nulls gracefully.
      supabaseQuery = supabaseQuery.or(
        `title.ilike.${searchTerm},brand.ilike.${searchTerm},description.ilike.${searchTerm}`
      );
      // Note: For better performance on large datasets, consider using Supabase full-text search
      // e.g., .textSearch('fts_column', query, { type: 'websearch' }) if you set up an FTS column.
    }

    // Apply category filter if provided (using like for prefix matching)
    if (category) {
      supabaseQuery = supabaseQuery.like('bread_crumbs', `${category}%`);
    }

    // Apply sorting
    let sortOptions: { column: string; ascending: boolean; nullsFirst: boolean } = {
      column: 'like_count', // Corrected default sort column
      ascending: false,
      nullsFirst: false,
    };

    if (sortBy === 'rated') {
      sortOptions = { column: 'stars', ascending: false, nullsFirst: false };
    } else if (sortBy === 'reviewed') {
      sortOptions = { column: 'reviews_count', ascending: false, nullsFirst: false };
    }
    // Default is 'liked' which is already set

    supabaseQuery = supabaseQuery.order(sortOptions.column, {
      ascending: sortOptions.ascending,
      nullsFirst: sortOptions.nullsFirst,
    });

    // Apply pagination using range
    supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

    // Execute query
    const { data: products, error } = await supabaseQuery;

    if (error) {
      console.error('Supabase query error fetching Amazon products:', error);
      return NextResponse.json({ error: 'Failed to fetch products from database' }, { status: 500 });
    }

    // Return the list of products with cache control headers
    return NextResponse.json({ products: products || [] }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache for 5 mins, serve stale for 10 more while revalidating
      },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API Error fetching Amazon products:', errorMessage);
    return NextResponse.json({ error: 'An internal server error occurred', details: errorMessage }, { status: 500 });
  }
}

// Add OPTIONS handler for CORS preflight if needed
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*', // Adjust for production
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
