import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth?.token;
  return isLoggedIn ? <Navigate to={`/dashboard`} /> : children;
};

export default PublicRoutes;
