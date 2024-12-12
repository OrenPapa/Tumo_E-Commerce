const express = require("express");
const {
  getProducts,
  getProduct,
  getProductsByIds,
  checkout,
  addProductController,
} = require("../controllers/productController");
const authenticateToken = require("../middleware/auth");
const authorizeAdmin = require("../middleware/authorize");

const router = express.Router();

// Route for getting all products
router.get("/", authenticateToken, getProducts);

// Route for getting a product by IDW
router.get("/:id", authenticateToken, getProduct);

// Route for getting products by an array of IDs
router.post("/by-ids", authenticateToken, getProductsByIds);

router.post("/checkout", authenticateToken, checkout);

// Route for adding a new product
router.post("/", authenticateToken, authorizeAdmin, addProductController);

module.exports = router;
