import '../styles/antd.less'
import '../styles/index.less'
import { i18n } from '../lib/i18n'
import { wrapper } from '../store'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { ConfigProvider } from 'antd'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Notifications from '../components/common/Notifications'
import { useEffect, useState } from 'react'

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const Layout =
    Component.Layout === undefined ? DefaultLayout : Component.Layout

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Provider store={store} stabilityCheck="never">
      <ConfigProvider
        theme={{
          hashed: false,
          token: {
            colorPrimary: '#5d40dd',
            colorPrimaryHover: '##8974E7',
          },
        }}
      >
        <Layout>
          <Notifications />
          <Component {...props.pageProps} />
        </Layout>
      </ConfigProvider>
    </Provider>
  )
}

export default appWithTranslation(MyApp, i18n)
