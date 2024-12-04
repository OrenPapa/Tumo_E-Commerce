import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Loader from "../../components/loader";
import Footer from "../../components/footer";
import ShopContext from "../../context/shopContext";
import "./style.css";
import ShoppingCard from "../../components/shoppingCard";

function Cart() {
  const {
    loading,
    cartProducts,
    fetchCartProducts,
    cart,
    addToCart,
    removeFromCart,
    checkout,
    clearCart,
  } = useContext(ShopContext);

  const [checkoutStatus, setCheckoutStatus] = useState(null); // Holds success or error message
  const navigate = useNavigate(); // For navigation

  // Fetch cart products whenever the cart changes
  useEffect(() => {
    fetchCartProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  // Handles the checkout process
  const handleCheckout = async () => {
    try {
      const message = await checkout(); // Calls the checkout function
      setCheckoutStatus({ success: true, message }); // Set success message
      clearCart(); // Clear cart data once the checkout is successful
    } catch (error) {
      setCheckoutStatus({ success: false, message: error.message }); // Set error message
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="cart-container">
          <h1 className="cart-title">Cart</h1>

          {/* Render cart products and checkout button only if there's no successful checkout */}
          {!checkoutStatus?.success && (
            <>
              <div className="cart-products-container">
                {cartProducts.length > 0 ? (
                  cartProducts.map((product) => {
                    const quantity =
                      cart.find((item) => item.id === product.id)?.qty || 0;

                    return (
                      <ShoppingCard
                        addToCart={addToCart}
                        product={product}
                        removeFromCart={removeFromCart}
                        quantity={quantity}
                        key={product.id}
                      />
                    );
                  })
                ) : (
                  <h2 className="cart-title">
                    {" "}
                    Your Shopping cart is empty...
                  </h2>
                )}
              </div>

              {/* Checkout Button */}
              {cartProducts.length > 0 && (
                <div className="cart-checkout-container">
                  <button
                    className="cart-checkout-button"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </>
          )}

          {/* Success/Error Message */}
          {checkoutStatus && (
            <div
              className={`checkout-message ${
                checkoutStatus.success ? "success" : "error"
              }`}
            >
              <p>{checkoutStatus.message}</p>
              {checkoutStatus.success && (
                <button
                  className="cart-go-back-button"
                  onClick={() => navigate("/")}
                >
                  Go Back to Products
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Cart;
