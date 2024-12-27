const withLess = require("next-with-less");
const { i18n } = require('./next-i18next.config')

module.exports = withLess({
  i18n,
  reactStrictMode: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    listingImagesBasePath: process.env.IMG_BASE_PATH || "/uploads/",
  },
  compiler: {
    styledComponents: true,
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      // TODO: This is not working
      modifyVars: {
        '@primary-color': '#5d40dd', 
        '@link-color': '#7b63e6',
        '@font-size-base': '14px',
        '@border-radius-base': '4px',
      },
    },
  },
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table", "rc-input" ]
});
