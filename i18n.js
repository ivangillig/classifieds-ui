// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from './next-i18next.config';

i18n
  .use(initReactI18next)
  .init({
    ...nextI18NextConfig.i18n,
    interpolation: {
      escapeValue: false,
    },
    ns: nextI18NextConfig.ns,
    defaultNS: nextI18NextConfig.defaultNS,
  });

export default i18n;
