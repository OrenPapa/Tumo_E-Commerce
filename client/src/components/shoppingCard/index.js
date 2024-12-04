import React from "react";

function ShoppingCard({ product, removeFromCart, quantity, addToCart }) {
  return (
    <div className="cart-product-container" key={product.id}>
      <div className="cart-product-details-container">
        <img
          src={product.picture}
          alt={product.name}
          className="cart-product-image"
        />
        <h2 className="cart-product-title">{product.name}</h2>
      </div>
      <div className="cart-product-price-container">
        <h3 className="cart-product-price">${product.price}</h3>
        <div className="cart-product-action-container">
          <button
            className="cart-product-button"
            onClick={() => removeFromCart(product.id)}
          >
            -
          </button>
          <span className="cart-product-count">{quantity}</span>
          <button
            className="cart-product-button"
            onClick={() => addToCart(product.id)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCard;
