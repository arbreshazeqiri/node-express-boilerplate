const httpStatus = require('http-status');
const { getProducts } = require('../controllers/product.controller');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  return Product.create(productBody);
};

/**
 * Query for Products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get Product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};


/**
 * Update Product by id
 * @param {ObjectId} ProductId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (ProductId, updateBody) => {
  const Product = await getProductById(ProductId);
  if (!Product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(Product, updateBody);
  await Product.save();
  return Product;
};

/**
 * Delete Product by id
 * @param {ObjectId} ProductId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (ProductId) => {
  const Product = await getProductById(ProductId);
  if (!Product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await Product.remove();
  return Product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
