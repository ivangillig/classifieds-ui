// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es'],
    serializeConfig: false,
    localeDetection: false,
    fallbackLng: 'es',
    debug: true,
    preload: ['en', 'es']
  },
  ns: ['common'],
  defaultNS: 'common',
};