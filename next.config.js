const withLess = require('next-with-less')

module.exports = withLess({
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  publicRuntimeConfig: {
    BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
    listingImagesBasePath: process.env.IMG_BASE_PATH || '/uploads/',
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'ClassifiedsApp',
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
  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
    'rc-input',
  ],
})
