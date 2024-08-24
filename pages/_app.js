import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/index.less';

import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import DefaultLayout from '../components/Layout/DefaultLayout'; 
import { wrapper } from '../store';
import nextI18NextConfig from '../next-i18next.config.js';
import Notifications from '../components/Notifications';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const Layout = Component.Layout === undefined ? DefaultLayout : Component.Layout;

  return (
    <Provider store={store}>
      <Layout>
        <Notifications />
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
