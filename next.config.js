const withLess = require('next-less');

const nextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: false,
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
  },
  compiler: {
    styledComponents: true,
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
};

module.exports = withLess(nextConfig);
