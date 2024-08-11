// pages/login.js
import React from "react";
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useTranslation } from "next-i18next";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <h2 className="login-title">{t('login')}</h2>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
