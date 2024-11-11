const { getAllProducts, getProductById } = require("../models/productModel");

// GET /products - Returns all products
const getProducts = (req, res) => {
  const products = getAllProducts();
  res.json(products);
};

// GET /products/:id - Returns a product by ID
const getProduct = (req, res) => {
  const product = getProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports = {
  getProducts,
  getProduct,
};
