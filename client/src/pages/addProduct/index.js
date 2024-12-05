import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ShopContext from "../../context/shopContext";

const initialState = {
  name: "",
  price: "",
  picture: "",
  description: "",
};

function AddProduct() {
  // State for form inputs as a single object
  const [formState, setFormState] = useState(initialState);
  const navigate = useNavigate();
  const { addProduct } = useContext(ShopContext);

  // State for feedback messages
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate input
    const { name, price, picture, description } = formState;
    if (!name || !price || !picture || !description) {
      setError("All fields are required");
      setMessage(null);
      return;
    }

    try {
      // Call the addProduct function from the context
      const successMessage = await addProduct(formState);

      // If successful, show success message
      setMessage(successMessage);
      setError(null);

      // Clear form inputs
      setFormState(initialState);

      // Navigate back to the homepage
      navigate("/");
    } catch (err) {
      // Handle errors
      setError(err.message);
      setMessage(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-product_container">
        <h1 className="add-product-title">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formState.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formState.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="picture"
            placeholder="Image URL"
            value={formState.picture}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formState.description}
            onChange={handleInputChange}
          />
          <button className="submit-button" type="submit">
            Add Product
          </button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <Footer />
    </>
  );
}

export default AddProduct;
