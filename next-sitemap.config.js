const siteUrl = 'https://canscanapp.ca';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true, // Generate robots.txt
  // Optional: Add any paths to exclude if needed
  // exclude: ['/server-sitemap.xml'],
  // Configure alternateRefs for i18n support
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
  // Optional: Add default locale ('en') URLs without prefix to the sitemap
  // This assumes your middleware allows accessing 'en' pages without the /en prefix
  transform: async (config, path) => {
    // Default transform returns path object
    return {
      loc: path, // => Route location: /fr/about, /about
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  // Optional: Default is 'public', change if your static export outputs elsewhere and you want sitemap there
  // outDir: './out', 
};
