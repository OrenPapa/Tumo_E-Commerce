const products = require("../data/products.json");
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");

const getAllProducts = () => products;

const getProductById = (id) =>
  products.find((product) => product.id === parseInt(id));

// Save the updated products list to the JSON file
const saveProducts = (products) => {
  fs.writeFileSync(
    productsFilePath,
    JSON.stringify(products, null, 2),
    "utf-8"
  );
};

module.exports = {
  getAllProducts,
  getProductById,
  saveProducts,
};
