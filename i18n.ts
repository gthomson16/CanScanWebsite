import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Define supported locales
const locales = ['en', 'fr'];

const defaultLocale = 'en'; // Define default locale for fallback

export default getRequestConfig(async ({locale}) => {
  // Handle undefined locale by falling back to defaultLocale
  const localeToUse = locale === undefined ? defaultLocale : locale;

  // Validate that the locale parameter is valid
  if (!locales.includes(localeToUse as any)) {
    notFound();
  }

  // After the check, locale is guaranteed to be 'en' or 'fr'
  const validLocale = localeToUse as typeof locales[number]; // Assert as 'en' | 'fr'

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
