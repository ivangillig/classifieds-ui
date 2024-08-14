import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/index.less';

import { appWithTranslation } from 'next-i18next';
import DefaultLayout from '../components/Layout/DefaultLayout'; 
import { wrapper } from '../store'; // Importa el wrapper
import nextI18NextConfig from '../next-i18next.config.js'

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout === undefined ? DefaultLayout : Component.Layout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig));
