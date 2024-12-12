import React, { useState, useContext } from "react";
import AuthContext from "../../context/authContext"; // Import the context
import "./style.css";

function Registration() {
  const { register } = useContext(AuthContext); // Access the register function
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseMessage = await register(formData);
      setMessage({ type: "success", text: responseMessage });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <div className="add-product_container">
      <h2 className="add-product-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
      {message && (
        <p
          className={
            message.type === "success" ? "success-message" : "error-message"
          }
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

export default Registration;
