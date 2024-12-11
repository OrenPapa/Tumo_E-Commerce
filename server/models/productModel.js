const db = require("../utils/database");

// Fetch all products
const getAllProducts = (callback) => {
  const query = "SELECT id, name, description, price, picture FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Fetch a product by ID
const getProductById = (id, callback) => {
  const query =
    "SELECT id, name, description, price, picture FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching product:", err);
      callback(err, null);
    } else {
      callback(null, results[0]); // Return the first matching product
    }
  });
};

// Add a new product
const addProduct = (product, callback) => {
  const query =
    "INSERT INTO products (name, description, price, picture) VALUES (?, ?, ?, ?)";
  const values = [
    product.name,
    product.description,
    product.price,
    product.picture,
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error adding product:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
