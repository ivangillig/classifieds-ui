// pages/login.js
import React from "react";
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useTranslation } from "next-i18next";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/static/logo.webp" alt="Logo" className="login-logo" />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
