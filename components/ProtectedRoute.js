// app/components/ProtectedRoute.js
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoadingOverlay from "./common/LoadingOverlay";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(!user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return children;
};

export default ProtectedRoute;
