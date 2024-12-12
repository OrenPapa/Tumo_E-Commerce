import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect if the user doesn't have the required role
    return <Navigate to="/" />;
  }

  // Allow access if authenticated and role matches (if required)
  return children;
};

export default PrivateRoute;
