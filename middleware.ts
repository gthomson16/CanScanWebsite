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
  // Revert to a standard matcher excluding common non-page assets
  // Explicitly exclude /images directory as well
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
};
