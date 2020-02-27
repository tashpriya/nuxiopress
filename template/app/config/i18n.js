// import different Locales for nuxt-i18n localization
import en from '../assets/locale/en';
import bn from '../assets/locale/bn';

export default {
  locales: [
    {
      code: 'en',
      name: 'English',
      iso: 'en-US'
    },
    {
      code: 'bn',
      name: 'বাংলা',
      iso: 'bn'
    }
  ],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en: en,
      bn: bn
    }
  },
  strategy: 'prefix_except_default',
  detectBrowserLanguage: {
    useCookie: true,
    // Cookie name
    cookieKey: '_nuxiopress_locale',
    // Set to always redirect to value stored in the cookie, not just once
    alwaysRedirect: false,
    // If no locale for the browsers locale is a match, use this one as a fallback
    fallbackLocale: null
  },
  seo: true
};
