const withLess = require("next-less");

const nextConfig = {
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    localeDetection: false,
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    listingImagesBasePath: process.env.IMG_BASE_PATH || "/uploads/",
  },
  compiler: {
    styledComponents: true,
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table", "rc-input" ]
};

module.exports = withLess(nextConfig);
