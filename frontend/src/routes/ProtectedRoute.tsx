import { authLocalStorage } from "@components/auth/localStorage";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = "/login" }) => {
  const { accessToken, userId } = authLocalStorage.get();
  const isLoggedIn = accessToken !== "" && userId !== "";

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
