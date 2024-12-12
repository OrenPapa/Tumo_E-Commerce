import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the authenticated user
  const [token, setToken] = useState(null); // Store the JWT token
  const navigate = useNavigate(); // Hook for navigation

  // Register a new user
  const register = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      navigate("/login"); // Navigate to login page on success
      return data.message; // Return success message
    } catch (error) {
      throw new Error(error.message || "An error occurred during registration");
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setToken(data.token); // Save the JWT token
      setUser({ id: data.id, role: data.role }); // Save the user details
      localStorage.setItem("authToken", data.token); // Persist the token
      navigate("/"); // Navigate to homepage on success
      return "Login successful!";
    } catch (error) {
      throw new Error(error.message || "An error occurred during login");
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken"); // Clear token from localStorage
    navigate("/login"); // Navigate to login page on logout
  };

  const value = {
    user, // Authenticated user
    token, // JWT token
    register, // Function to register a user
    login, // Function to log in a user
    logout, // Function to log out a user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
