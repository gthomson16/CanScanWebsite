import { MetadataRoute } from 'next';
import { locales } from '@/i18n'; // Import your defined locales

const BASE_URL = 'https://canscanapp.ca';

// Define your static routes (add any other top-level pages here)
const staticRoutes = [
  '', // Represents the homepage '/'
  '/about',
  '/features',
  '/download',
  '/support',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and static route
  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(), // Use current date, or fetch specific dates if available
        // changeFrequency: 'weekly', // Optional: How often the page might change
        // priority: route === '' ? 1.0 : 0.8, // Optional: Priority relative to other pages (1.0 is highest)
      });
    });
  });

  // Add entries for non-locale-prefixed default locale if needed (depends on your routing setup)
  // If your default locale ('en') also exists at the root (e.g., canscanapp.ca/about), add those too.
  // Assuming 'en' is the default and accessible without prefix:
  staticRoutes.forEach((route) => {
     // Avoid adding the root '/' twice if it's the same as '/en'
    if (route !== '') { 
        sitemapEntries.push({
            url: `${BASE_URL}${route}`,
            lastModified: new Date(),
            // priority: 0.8, 
        });
    } else {
         // Ensure the root URL itself is included once
         if (!sitemapEntries.some(entry => entry.url === BASE_URL || entry.url === `${BASE_URL}/`)) {
            sitemapEntries.push({
                url: BASE_URL,
                lastModified: new Date(),
                // priority: 1.0,
            });
         }
    }
  });


  // If you had dynamic routes (e.g., /products/[slug]), you would fetch those slugs
  // and generate entries for them here for each locale.

  return sitemapEntries;
}
