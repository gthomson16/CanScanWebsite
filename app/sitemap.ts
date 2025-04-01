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
      // Removed extra closing brace/parenthesis here
    });
  });

  // Add entries for the default locale ('en') without the prefix, as localePrefix is 'as-needed'
  staticRoutes.forEach((route) => {
    sitemapEntries.push({
      url: `${BASE_URL}${route}`, // Add URLs like /about, /features, and the root /
      lastModified: new Date(),
      // priority: route === '' ? 1.0 : 0.8, // Optional: Prioritize homepage
    });
  });

  // If you had dynamic routes (e.g., /products/[slug]), you would fetch those slugs
  // and generate entries for them here for each locale.

  return sitemapEntries;
}
