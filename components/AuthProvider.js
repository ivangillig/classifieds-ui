// app/components/AuthProvider.js
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../actions/auth";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(loginRequest());
  }, [dispatch]);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
