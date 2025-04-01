import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Explicitly set prefix behavior (default is 'as-needed')
  localePrefix: 'as-needed' 
});

export const config = {
  // Update matcher to exclude sitemap.xml, robots.txt, and common non-page assets
  matcher: ['/((?!api|_next/static|_next/image|images|sitemap\\.xml|robots\\.txt|favicon\\.ico).*)']
};
