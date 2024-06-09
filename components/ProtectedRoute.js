// app/components/ProtectedRoute.js
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoginPage from "../pages/login";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  if (!user) {
    return <LoginPage />;
  }

  return children;
};

export default ProtectedRoute;
