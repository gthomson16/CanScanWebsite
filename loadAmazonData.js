const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { chain } = require('stream-chain');

// --- Configuration ---
const JSON_FILE_PATH = 'dataset_Amazon-crawler_2025-04-16_21-21-37-918.json';
const SUPABASE_URL = process.env.SUPABASE_URL; // Get from environment variable
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY; // Get from environment variable
const TABLE_NAME = 'products_amazon';
const CONFLICT_COLUMN = 'asin'; // The column with the unique constraint
const BATCH_SIZE = 100; // Process products in batches
// --- End Configuration ---

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables must be set.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

let productsBatch = [];
let processedCount = 0;
let successCount = 0;
let errorCount = 0;
let isPaused = false;
let streamFinished = false;

async function processBatch() {
  if (productsBatch.length === 0) {
    if (streamFinished) {
      console.log('\n--- Processing Complete ---');
      console.log(`Total products processed: ${processedCount}`);
      console.log(`Successfully upserted: ${successCount}`);
      console.log(`Errors: ${errorCount}`);
    }
    return;
  }

  const batchToProcess = [...productsBatch];
  productsBatch = []; // Clear the batch for the next round

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .upsert(batchToProcess, { onConflict: CONFLICT_COLUMN });

    if (error) {
      console.error(`\nError upserting batch:`, error.message);
      // Log ASINs for failed batch items if possible, or just count them
      errorCount += batchToProcess.length;
      console.error(`Failed ASINs in batch (first few): ${batchToProcess.slice(0, 5).map(p => p.asin).join(', ')}...`);
    } else {
      successCount += batchToProcess.length; // Assuming all succeeded if no error
    }
  } catch (err) {
    console.error(`\nUnexpected error during Supabase upsert:`, err);
    errorCount += batchToProcess.length;
  } finally {
    processedCount += batchToProcess.length;
    process.stdout.write(`\rProcessed: ${processedCount} | Success: ${successCount} | Errors: ${errorCount}`);

    // Resume the stream if it was paused
    if (isPaused) {
      isPaused = false;
      pipeline.resume();
      // console.log('\nStream resumed.');
    }

    // Process the next batch if the stream is finished but there are remaining items
    if (streamFinished && productsBatch.length > 0) {
        await processBatch();
    } else if (streamFinished && productsBatch.length === 0) {
        console.log('\n--- Final Batch Processed ---');
        console.log(`Total products processed: ${processedCount}`);
        console.log(`Successfully upserted: ${successCount}`);
        console.log(`Errors: ${errorCount}`);
    }
  }
}


console.log(`Starting data load from ${JSON_FILE_PATH} into ${TABLE_NAME}...`);
console.log(`Using Supabase URL: ${SUPABASE_URL.substring(0, 20)}...`); // Don't log the full URL or key

const pipeline = chain([
  fs.createReadStream(JSON_FILE_PATH),
  parser(),
  streamArray(),
  async data => {
    const product = data.value;
    // Map JSON fields to table columns
    const productRow = {
      asin: product.asin,
      title: product.title,
      brand: product.brand,
      stars: product.stars,
      reviews_count: product.reviewsCount, // Map reviewsCount to reviews_count
      thumbnail_image: product.thumbnailImage,
      bread_crumbs: product.breadCrumbs,
      description: product.description,
      price_value: product.price ? product.price.value : null, // Handle null price
      price_currency: product.price ? product.price.currency : null, // Handle null price
      url: product.url,
      // created_at and updated_at will default or be updated by Supabase/triggers
    };

    // Basic validation
    if (!productRow.asin) {
        console.warn(`\nSkipping product without ASIN: ${product.title ? product.title.substring(0, 50) + '...' : 'N/A'}`);
        errorCount++; // Count as an error/skipped item
        return;
    }


    productsBatch.push(productRow);

    if (productsBatch.length >= BATCH_SIZE) {
      // Pause the stream and process the batch
      pipeline.pause();
      isPaused = true;
      // console.log(`\nBatch full (${productsBatch.length}), pausing stream and processing...`);
      await processBatch();
    }
  }
]);

pipeline.on('error', (err) => {
  console.error('\nStream pipeline error:', err);
  errorCount++; // Increment error count for stream errors
});

pipeline.on('end', async () => {
  console.log('\nJSON stream finished. Processing any remaining products...');
  streamFinished = true;
  // Process the final batch if any products are left
  if (productsBatch.length > 0) {
    await processBatch();
  } else {
      console.log('\n--- Processing Complete (No final batch) ---');
      console.log(`Total products processed: ${processedCount}`);
      console.log(`Successfully upserted: ${successCount}`);
      console.log(`Errors: ${errorCount}`);
  }
});

console.log('Pipeline started. Processing...');
