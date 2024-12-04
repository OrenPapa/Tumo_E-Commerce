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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ShopProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </ShopProvider>
  </BrowserRouter>
);

reportWebVitals();
