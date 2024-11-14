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

// POST /products/by-ids - Returns products by an array of IDs
const getProductsByIds = (req, res) => {
  console.log("Request received at /by-ids with body:", req.body); // Add this line
  const { ids } = req.body; // Receive an array of IDs in the request body

  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "Invalid input, array of IDs expected" });
  }

  const selectedProducts = ids
    .map((id) => getProductById(id))
    .filter((product) => product);

  res.json(selectedProducts);
};

module.exports = {
  getProducts,
  getProduct,
  getProductsByIds,
};
