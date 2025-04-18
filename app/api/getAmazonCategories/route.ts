import { NextResponse } from 'next/server';
import { supabase } from 'lib/supabaseClient'; // Ensure this path is correct

// Define the structure for a category node in the tree
interface CategoryNode {
  name: string;
  children: CategoryNode[];
  productCount: number; // Add product count field
}

// Define the structure for the data returned by the SQL function
interface CategoryCountResult {
  bread_crumbs: string; // Matches column name from SQL
  product_count: number; // Matches column name from SQL
}

// Helper function to find a node in the tree by path parts
function findNode(root: CategoryNode, parts: string[]): CategoryNode | null {
    let currentNode: CategoryNode | undefined = root;
    for (const part of parts) {
        if (!currentNode?.children) return null;
        currentNode = currentNode.children.find(child => child.name === part);
        if (!currentNode) return null;
    }
    return currentNode;
}

// Helper function to build the category tree with product counts
// Takes the result from the SQL function directly
function buildCategoryTreeWithCounts(categoryCountsResult: CategoryCountResult[]): CategoryNode[] {
  const root: CategoryNode = { name: 'root', children: [], productCount: 0 }; // Temporary root

  // Extract unique breadcrumbs and map exact counts
  const uniqueBreadcrumbs: string[] = [];
  const exactCountsMap = new Map<string, number>();

  categoryCountsResult.forEach(({ bread_crumbs, product_count }) => {
    if (bread_crumbs && typeof bread_crumbs === 'string' && bread_crumbs.trim() !== '') {
        const trimmedBreadcrumb = bread_crumbs.trim();
        uniqueBreadcrumbs.push(trimmedBreadcrumb); // Collect all valid breadcrumbs for tree building
        exactCountsMap.set(trimmedBreadcrumb, product_count); // Store exact count
    }
  });

  // --- Step 1: Build the tree structure ---
  // Use only unique paths to build the structure efficiently
  Array.from(new Set(uniqueBreadcrumbs)).forEach(breadcrumb => {
    const parts = breadcrumb.split(' > ').map(part => part.trim()).filter(part => part !== '');
    if (parts.length === 0) return;

    let currentNode = root;
    parts.forEach(part => {
      let childNode = currentNode.children.find(child => child.name === part);
      if (!childNode) {
        childNode = { name: part, children: [], productCount: 0 }; // Initialize count to 0
        currentNode.children.push(childNode);
      }
      currentNode = childNode;
    });
  });

  // --- Step 2: Assign exact counts to the corresponding nodes ---
  exactCountsMap.forEach((count, breadcrumb) => {
      const parts = breadcrumb.split(' > ').map(part => part.trim()).filter(part => part !== '');
      if (parts.length === 0) return;
      const node = findNode(root, parts);
      if (node) {
          node.productCount = count; // Assign exact count from DB
      } else {
          console.warn(`Node not found for breadcrumb during count assignment: ${breadcrumb}`);
      }
  });

  // --- Step 3: Aggregate counts recursively (post-order traversal) ---
  const aggregateCounts = (node: CategoryNode): number => {
    // If it's a leaf node, its total count is just its exact count (already assigned)
    if (!node.children || node.children.length === 0) {
      return node.productCount || 0;
    }

    // If it has children, recursively calculate their total counts
    let childrenTotalCount = 0;
    node.children.forEach(child => {
      childrenTotalCount += aggregateCounts(child); // Sum the results of recursive calls
    });

    // Node's total count is its own exact count + the sum of its children's total counts
    node.productCount = (node.productCount || 0) + childrenTotalCount;
    return node.productCount;
  };

  // Start aggregation from the children of the temporary root
  // The aggregateCounts function now correctly calculates and assigns the total count during traversal
  root.children.forEach(aggregateCounts);


  // --- Step 4: Sort children alphabetically ---
  const sortChildren = (node: CategoryNode) => {
    if (!node.children || node.children.length === 0) return;
    node.children.sort((a, b) => a.name.localeCompare(b.name));
    node.children.forEach(sortChildren);
  };
  sortChildren(root);

  return root.children;
}

export async function GET() {
  try {
    console.log("Starting getAmazonCategories API call (using RPC)");

    // --- Step 1: Call the SQL function to get counts per exact breadcrumb path ---
    // Ensure the SQL function 'get_amazon_category_counts' exists
    // CREATE OR REPLACE FUNCTION public.get_amazon_category_counts()
    // RETURNS TABLE(bread_crumbs text, product_count bigint) AS $$
    // BEGIN
    //   RETURN QUERY
    //   SELECT pa.bread_crumbs, COUNT(*) as product_count
    //   FROM public.products_amazon pa
    //   WHERE pa.bread_crumbs IS NOT NULL AND pa.bread_crumbs <> ''
    //   GROUP BY pa.bread_crumbs;
    // END;
    // $$ LANGUAGE plpgsql;

    const { data: categoryCountsResult, error: rpcError } = await supabase.rpc('get_amazon_category_counts');

    if (rpcError) {
        console.error('Supabase RPC error fetching category counts:', rpcError);
        return NextResponse.json({ error: `Failed to fetch category counts: ${rpcError.message}` }, { status: 500 });
    }

    if (!categoryCountsResult) {
        console.warn('RPC call returned no data for category counts.');
        return NextResponse.json({ categories: [] }, { status: 200 }); // Return empty tree if no data
    }

    // --- Step 2: Build the tree and aggregate counts ---
    try {
      // Type assertion needed as rpc result type might be generic
      const countsData = categoryCountsResult as CategoryCountResult[];
      const categoryTree = buildCategoryTreeWithCounts(countsData);

      return NextResponse.json({ categories: categoryTree }, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600', // Cache categories for 1 hour
        },
      });
    } catch (processingError) {
      console.error('Error processing categories or counts:', processingError);
       return NextResponse.json({ error: 'Failed to process category data' }, { status: 500 });
    }

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
