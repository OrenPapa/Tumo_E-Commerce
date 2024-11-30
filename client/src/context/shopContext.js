import React, { createContext, useState, useEffect } from "react";

// Create the context for the Shop, providing a way to access state and functions throughout the app
const ShopContext = createContext();

/**
 * ShopProvider component that wraps the application, providing shop-related data and functionality
 */
export const ShopProvider = ({ children }) => {
  // State to store the list of products available in the shop
  const [products, setProducts] = useState([]);

  // Initialize cart state from localStorage or default to an empty array
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // State to store detailed information about products in the cart
  const [cartProducts, setCartProducts] = useState([]);

  // State to manage loading status for asynchronous operations
  const [loading, setLoading] = useState(true);

  /**
   * Calculates the total quantity of items in the cart
   * @returns {number} - The total quantity of all items in the cart
   */
  const cartLength = cart.reduce((total, item) => total + item?.qty, 0);

  /**
   * Clears the cart state and removes it from localStorage
   */
  const clearCart = () => {
    setCart([]);
    setCartProducts([]);
    localStorage.removeItem("cart");
  };

  /**
   * useEffect to save the cart state to localStorage whenever it changes
   */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // useEffect to load the list of products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetches all products from the API and updates the products state
   */
  const fetchProducts = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching data
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data); // Update products state with the fetched data
      setLoading(false); // Set loading state to false after fetching data
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  /**
   * Fetches detailed product data for all items in the cart
   */
  const fetchCartProducts = async () => {
    const ids = cart.map((item) => item.id); // Extract product IDs from the cart
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/by-ids",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids }),
        }
      );
      const data = await response.json();
      setCartProducts(data); // Update cartProducts state with detailed product data
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  /**
   * Fetches a specific product by its ID from the API
   * @param {number} id - The ID of the product to fetch
   * @returns {Object} - The product data if found
   */
  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  /**
   * Adds a product to the cart or increases its quantity if it's already in the cart
   * @param {number} productId - The ID of the product to add
   */
  const addToCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);
      if (item) {
        // If item is already in the cart, increase its quantity
        return prevCart.map((item) =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // If item is not in the cart, add it with quantity of 1
      return [...prevCart, { id: productId, qty: 1 }];
    });
  };

  /**
   * Removes a product from the cart or decreases its quantity if the quantity is more than 1
   * @param {number} productId - The ID of the product to remove
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);

      // If the item does not exist in the cart or its quantity is 0, do nothing
      if (!item || item.qty === 0) {
        return prevCart;
      }

      if (item.qty === 1) {
        // If quantity is 1, remove the item from the cart
        return prevCart.filter((item) => item.id !== productId);
      }

      // Otherwise, decrease the quantity by 1
      return prevCart.map((item) =>
        item.id === productId ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  /**
   * Sends the cart data to the backend for checkout
   * @returns {Promise<string>} - The success message from the backend
   */
  const checkout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart }), // Send the cart data to the backend
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Checkout failed");
      }

      const data = await response.json();
      return data.message; // Return the success message
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products, // Array of products available in the shop
        fetchProductById, // Function to fetch a single product by ID
        loading, // Boolean representing the loading state of fetching products
        cart, // Array representing the items in the shopping cart
        cartProducts, // Array of detailed product information for items in the cart
        cartLength, // Total quantity of items in the cart
        addToCart, // Function to add items to the cart or increase their quantity
        removeFromCart, // Function to remove items from the cart or decrease their quantity
        fetchCartProducts, // Function to fetch detailed information of all items in the cart
        checkout, // Function to send the product selected to the backend to complete the checkout
        clearCart, // Reset the Cart to an empty state
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
