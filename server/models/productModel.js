const products = require('../data/products.json');

const getAllProducts = () => products;

const getProductById = (id) => products.find(product => product.id === parseInt(id));

module.exports = {
  getAllProducts,
  getProductById
};
