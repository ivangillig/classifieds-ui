const withLess = require("next-less");
const withTM = require("next-transpile-modules")(["antd", "@ant-design/icons"]);

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
};

// Combina `next-less` y `next-transpile-modules`
module.exports = withTM(withLess(nextConfig));
