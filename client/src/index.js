import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/home";
import ProductDetail from "./pages/productDetails";
import { ShopProvider } from "./context/shopContext";
import Cart from "./pages/cart";
import AddProduct from "./pages/addProduct";
import { AuthProvider } from "./context/authContext";
import Registration from "./pages/registration";
import Login from "./pages/login";
import PublicRoute from "./components/routes/publicRoute";
import PrivateRoute from "./components/routes/privateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ShopProvider>
                <Home />
              </ShopProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ShopProvider>
                <ProductDetail />
              </ShopProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <ShopProvider>
                <Cart />
              </ShopProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute requiredRole="admin">
              <ShopProvider>
                <AddProduct />
              </ShopProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
