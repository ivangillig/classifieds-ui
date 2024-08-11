// pages/login.js
import React from "react";
import GoogleLoginButton from '../components/GoogleLoginButton';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/static/logo.webp" alt="Logo" className="login-logo" />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

// empty Layout to avoid DefaultLayout
LoginPage.Layout = ({ children }) => <>{children}</>;

export default LoginPage;
