'use client';

import React from 'react';
import { Button } from 'primereact/button';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
  };

  return (
    <Button
      label="Login with Google"
      icon="pi pi-google"
      className="login-button"
      onClick={handleLogin}
    />
  );
};

export default GoogleLoginButton;
