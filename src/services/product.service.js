const httpStatus = require('http-status');
const { Product } = require('../models');
const {userService} = require('./user.service');
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
 * Get Product by image
 * @param {string} image
 * @returns {Promise<Product>}
 */
 const getProductByImage = async (image) => {
  return Product.findOne({image});
};




/**
 * Update Product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete Product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  getProductByImage,
  updateProductById,
  deleteProductById,
};
