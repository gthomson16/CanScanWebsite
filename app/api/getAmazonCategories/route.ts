import { NextResponse } from 'next/server';
import { supabase } from 'lib/supabaseClient'; // Updated import path

export async function GET() {
  try {
    // Fetch all non-null, non-empty bread_crumbs
    const { data, error } = await supabase
      .from('products_amazon')
      .select('bread_crumbs')
      .not('bread_crumbs', 'is', null)
      .not('bread_crumbs', 'eq', '');

    if (error) {
      console.error('Supabase query error fetching breadcrumbs for categories:', error);
      const errorMessage = typeof error === 'object' && error !== null && 'message' in error
                           ? String((error as { message: string }).message)
                           : 'Failed to fetch categories from database';
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    // Define an interface for the expected row structure
    interface BreadcrumbRow {
      bread_crumbs: string | null;
    }

    // Process the data in JavaScript to get distinct top-level categories
    const categoriesSet = new Set<string>();
    (data || []).forEach((row: BreadcrumbRow) => {
        // Ensure bread_crumbs exists and is a string before splitting
        if (row.bread_crumbs && typeof row.bread_crumbs === 'string') {
            const topLevel = row.bread_crumbs.split(' > ')[0];
            // Add to set only if topLevel is a non-empty string
            if (topLevel && topLevel.trim() !== '') {
                categoriesSet.add(topLevel.trim());
            }
        }
    });

    // Convert set to sorted array
    const categories = Array.from(categoriesSet).sort();

    // Return the list of distinct categories
    return NextResponse.json({ categories: categories }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // Cache categories for 1 hour
      },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API Error fetching categories:', errorMessage);
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
