import React, { useContext, useEffect } from "react";
import Navbar from "../../components/navbar";
import Loader from "../../components/loader";
import Footer from "../../components/footer";
import ShopContext from "../../context/shopContext";
import "./style.css";

function Cart() {
  const {
    loading,
    cartProducts,
    fetchCartProducts,
    cart,
    addToCart,
    removeFromCart,
  } = useContext(ShopContext);
  console.log(cartProducts);

  // Fetch cart products
  useEffect(() => {
    fetchCartProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="cart-container">
          <h1 className="cart-title">Cart</h1>
          <div className="cart-products-container">
            {cartProducts.length > 0 ? (
              cartProducts.map((product) => {
                // Find the quantity for each product in the cart
                const quantity =
                  cart.find((item) => item.id === product.id)?.qty || 0;

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
              })
            ) : (
              <h2 className="cart-title"> Your Shopping cart is empty...</h2>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Cart;
