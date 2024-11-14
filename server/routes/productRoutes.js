const express = require("express");
const {
  getProducts,
  getProduct,
  getProductsByIds,
} = require("../controllers/productController");

const router = express.Router();

// Route for getting all products
router.get("/", getProducts);

// Route for getting a product by IDW
router.get("/:id", getProduct);

// Route for getting products by an array of IDs
router.post("/by-ids", getProductsByIds);

module.exports = router;
