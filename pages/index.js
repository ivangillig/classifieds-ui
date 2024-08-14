// pages/index.js
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const HomePage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
      <Card title={t('welcome_message')}>
        <Button 
          label={t('go_to_login')} 
          icon="pi pi-sign-in" 
          className="p-button-outlined" 
          onClick={() => router.push("/login")}
        />
        <Button 
          label={t('go_to_main')} 
          icon="pi pi-arrow-right" 
          className="p-button-outlined p-ml-2" 
          onClick={() => router.push("/")}
        />
      </Card>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
}

export default HomePage;
