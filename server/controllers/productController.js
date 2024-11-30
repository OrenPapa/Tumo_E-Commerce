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

// POST /products/by-ids - Returns products by an array of IDs. Expect a payload like this: { "ids": [1, 2, 3] }
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

// POST /products/checkout - Processes the checkout for the provided cart. Expect a payload like this: { "cart": [{ "id": 1, "qty": 2 }, { "id": 2, "qty": 1 }] }
const checkout = (req, res) => {
  const { cart } = req.body; // Receive the cart array in the request body

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty or invalid" });
  }

  // Normally, you'd validate stock or perform payment processing here

  res.json({ message: "Thank you for your purchase!" });
};

module.exports = {
  getProducts,
  getProduct,
  getProductsByIds,
  checkout,
};
