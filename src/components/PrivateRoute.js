import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role, userRole }) {
  // Only allow access if userRole matches role
  if (userRole !== role) {
    return <Navigate to="/" />; // redirect to login if role mismatch
  }
  return children;
}
