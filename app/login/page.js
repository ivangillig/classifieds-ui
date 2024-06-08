import React from "react";
import GoogleLoginButton from '../../components/GoogleLoginButton';
import '../../styles/pages/login.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <h2 className="login-title">Login</h2>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
