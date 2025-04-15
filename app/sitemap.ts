import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.canscanapp.ca';

// Define static pages (add any other static routes here)
const staticPages = [
  '', // Home page
  '/about',
  '/features',
  '/download',
  '/support',
  '/privacy',
  '/terms',
  '/product-search', // Added product search page
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  staticPages.forEach((page) => {
    // Add English version
    sitemapEntries.push({
      url: `${siteUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly', // Adjust as needed
      priority: page === '' ? 1.0 : 0.8, // Adjust as needed
      alternates: {
        languages: {
          en: `${siteUrl}${page}`,
          fr: `${siteUrl}/fr${page}`,
        },
      },
    });

    // Add French version
    sitemapEntries.push({
      url: `${siteUrl}/fr${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}${page}`,
          fr: `${siteUrl}/fr${page}`,
        },
      },
    });
  });

  return sitemapEntries;
}
