import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    // Redirect authenticated users to the home page
    return <Navigate to="/" />;
  }

  // Allow access if not authenticated
  return children;
};

export default PublicRoute;
