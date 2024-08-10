// pages/index.js
import DefaultLayout from '../components/Layout/DefaultLayout';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// check if i need to use it for i18n issue
export async function getStaticProps({ locale, defaultLocale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? defaultLocale)),
    },
  };
}

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout title={t('app_name')}>
      <Card title={t('welcome_message')}>
        <Button label={t('go_to_login')} icon="pi pi-sign-in" className="p-button-outlined" onClick={() => window.location.href = "/login"} />
        <Button label={t('go_to_main')} icon="pi pi-arrow-right" className="p-button-outlined p-ml-2" onClick={() => window.location.href = "/main"} />
      </Card>
    </DefaultLayout>
  );
};

export default HomePage;

