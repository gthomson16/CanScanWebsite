import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Define supported locales
export const locales = ['en', 'fr'] as const; // Export the locales array
type Locale = typeof locales[number]; // This creates a type 'en' | 'fr'

const defaultLocale: Locale = 'en'; // Define default locale for fallback

export default getRequestConfig(async ({locale}) => {
  // Handle undefined locale by falling back to defaultLocale
  const localeToUse = locale === undefined ? defaultLocale : locale;

  // Validate that the locale parameter is valid - checking with type assertion
  if (!locales.includes(localeToUse as Locale)) {
    notFound();
  }

  // After the check, locale is guaranteed to be 'en' or 'fr'
  const validLocale = localeToUse as Locale; // Assert as 'en' | 'fr'

  try {
    const messages = (await import(`./messages/${validLocale}.json`)).default;
    return {
      // Pass the validated and typed locale
      locale: validLocale, 
      messages: messages
    };
  } catch (error) {
    // Log error for debugging (consider more robust logging in production)
    console.error(`[i18n] Error loading messages for locale ${validLocale}:`, error); 
    notFound(); // Call notFound if messages fail to load
  }
});
