import React from "react";
import { Button } from "primereact/button";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <h2 className="login-title">Login</h2>
        <Button
          label="Login with Google"
          icon="pi pi-google"
          className="login-button"
        />
      </div>
    </div>
  );
};

export default LoginPage;
