// components/GoogleLoginButton.js
"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { loginRequest } from "../actions/auth";
import { Button } from "primereact/button";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;
    dispatch(loginRequest());
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
