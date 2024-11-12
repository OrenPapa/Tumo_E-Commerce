import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const handleNavigation = () => {
    navigate(`/product/${product.id}`);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="product-card">
      <div className="product-card-content" onClick={handleNavigation}>
        <img
          src={product.picture}
          alt={product.name}
          className="product-card-image"
        />
        <h2 className="product-card-title">{product.name}</h2>
        <p className="product-card-price">${product.price.toFixed(2)}</p>
      </div>
      <div className="product-card-action-container">
        <button className="product-card-button" onClick={decrementCount}>
          -
        </button>
        <span className="product-card-count">{count}</span>
        <button className="product-card-button" onClick={incrementCount}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
