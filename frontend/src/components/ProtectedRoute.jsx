import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("adminToken");

  return token ? children : <Navigate to="/admin" />;
}

export default ProtectedRoute;