const siteUrl = 'https://www.canscanapp.ca';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // Force a single sitemap instead of a sitemap index
  sitemapSize: 50000, // Large enough to contain all your URLs in one file
  // Don't create an index - important!
  generateIndexSitemap: false,
  alternateRefs: [
    {
      href: siteUrl,
      hreflang: 'en',
    },
    {
      href: `${siteUrl}/fr`,
      hreflang: 'fr',
    },
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
};