const {
  getAllProducts,
  getProductById,
  addProduct,
} = require("../models/productModel");

// GET /products - Returns all products
const getProducts = (req, res) => {
  getAllProducts((err, products) => {
    if (err) {
      res.status(500).json({ message: "Error fetching products" });
    } else {
      const updatedProducts = products.map((product) => ({
        ...product,
        price: Number(product.price), // Ensure price is a number
      }));
      res.json(updatedProducts);
    }
  });
};

// GET /products/:id - Returns a product by ID
const getProduct = (req, res) => {
  const id = req.params.id;
  getProductById(id, (err, product) => {
    if (err) {
      res.status(500).json({ message: "Error fetching product" });
    } else if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      const updatedProduct = {
        ...product,
        price: Number(product.price), // Ensure price is a number
      };
      res.json(updatedProduct);
    }
  });
};

// POST /products/by-ids - Returns products by an array of IDs. Expect a payload like this: { "ids": [1, 2, 3] }
const getProductsByIds = (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "Invalid input, array of IDs expected" });
  }

  // Fetch products and ensure price is a number
  const selectedProducts = ids
    .map((id) => {
      const product = getProductById(id);
      return product ? { ...product, price: Number(product.price) } : null;
    })
    .filter((product) => product !== null);

  res.json(selectedProducts);
};

// POST /products/checkout - Processes the checkout for the provided cart. Expect a payload like this: { "cart": [{ "id": 1, "qty": 2 }, { "id": 2, "qty": 1 }] }
const checkout = (req, res) => {
  const { cart } = req.body;

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty or invalid" });
  }

  // Example of fetching product details (if needed)
  const detailedCart = cart.map((item) => {
    const product = getProductById(item.id);
    return product
      ? { ...product, qty: item.qty, price: Number(product.price) }
      : null;
  });

  res.json({
    message: "Thank you for your purchase!",
    cart: detailedCart.filter((item) => item !== null),
  });
};

// POST /products - Adds a new product
const addProductController = (req, res) => {
  const { name, description, price, picture } = req.body;

  // Validate input
  if (!name || !description || !price || !picture) {
    return res.status(400).json({
      message: "All fields (name, description, price, picture) are required",
    });
  }

  const newProduct = { name, description, price, picture };
  addProduct(newProduct, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error adding product" });
    } else {
      res
        .status(201)
        .json({ message: "Product added successfully", id: results.insertId });
    }
  });
};

module.exports = {
  getProducts,
  getProduct,
  getProductsByIds,
  checkout,
  addProductController,
};
