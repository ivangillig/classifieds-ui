// pages/_app.js
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/index.less';

import { Provider } from 'react-redux';
import store from '../store';
import { appWithTranslation } from 'next-i18next';
import '../i18n';

import DefaultLayout from '../components/Layout/DefaultLayout'; 

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
