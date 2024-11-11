const express = require("express");
const { getProducts, getProduct } = require("../controllers/productController");

const router = express.Router();

// Route for getting all products
router.get("/", getProducts);

// Route for getting a product by ID
router.get("/:id", getProduct);

module.exports = router;
