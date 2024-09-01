import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/index.less';

import { i18n } from '../lib/i18n'
import { wrapper } from '../store';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import DefaultLayout from '../components/Layout/DefaultLayout'; 
import Notifications from '../components/common/Notifications';

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const Layout = Component.Layout === undefined ? DefaultLayout : Component.Layout;

  return (
    <Provider store={store} stabilityCheck="never">
      <Layout>
        <Notifications />
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(MyApp, i18n);
