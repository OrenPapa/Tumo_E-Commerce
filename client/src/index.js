import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/home";
import ProductDetail from "./pages/productDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
