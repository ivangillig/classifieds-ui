// next.config.js
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;