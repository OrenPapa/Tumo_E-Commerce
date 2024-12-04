import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./style.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  // State for form inputs
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // State for feedback messages
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate input
    if (!name || !price || !picture || !description) {
      setError("All fields are required");
      setMessage(null);
      return;
    }

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          picture,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // If successful, show success message
      setMessage("Product added successfully!");
      setError(null);

      // Clear form inputs
      setName("");
      setPrice("");
      setPicture("");
      setDescription("");
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Add Product</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <Footer />
    </>
  );
}

export default AddProduct;
