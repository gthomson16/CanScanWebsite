/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // Removed - default in Next.js 15+
  // output: 'export', // Removed for next-intl compatibility
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: false, // Explicitly set to false (default)
};

// Use require (CommonJS) instead of import
// eslint-disable-next-line @typescript-eslint/no-var-requires -- Next.js config often needs require
const createNextIntlPlugin = require('next-intl/plugin'); 
// Pass the path to the i18n config file
const withNextIntl = createNextIntlPlugin('./i18n.ts'); 

module.exports = withNextIntl(nextConfig); // Use module.exports
