const { i18n } = require('./next-i18next.config');
const withLess = require('next-less');

const nextConfig = {
  i18n,
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
