import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ShopContext from "../../context/shopContext";
import "./style.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cart } = useContext(ShopContext);

  const handleNavigation = () => {
    navigate(`/product/${product.id}`);
  };

  const incrementCount = () => {
    addToCart(product.id);
  };

  const decrementCount = () => {
    removeFromCart(product.id);
  };

  const productInCart = cart.find((item) => item.id === product.id);
  const count = productInCart ? productInCart.qty : 0;

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
