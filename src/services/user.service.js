const httpStatus = require('http-status');
const { User, Product } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(409, 'Email already taken');
  }
  if (await User.isUsernameTaken(userBody.username)){
    throw new ApiError(410, 'Username already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};


/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
  return User.findOne({username});
};


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // if(updateBody.username && (await User.isUsernameTaken(updateBody.username, userId))){
  //   throw new ApiError(httpStatus.)
//}
  Object.assign(user, updateBody);
  await user.save();
  return user;
};



/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};


/**
 * Adds product to wishlist
 * @param {ObjectId} productId
 * @param {ObjectId} userId
 * @returns {Promise<Product>}
 */
 const addProductToWishlist = async (productId,userId)  =>{
  const user  = await User.findById(userId);
  const product = await Product.findById(productId);
  
  if(user.wishlist.includes(productId) !== true){
    user.wishlist.push(product);
    user.save(user);
    return "Product added to wishlist";
  }
  else {
    user.wishlist.remove(product);
    user.save(user);
    return "Product removed from wishlist";
  }
}

/**
 * Adds product to cart
 * @param {ObjectId} productId
 * @param {ObjectId} userId
 * @returns {Promise<Product>}
 */
const addProductToCart = async (productId,userId)  =>{
  const user  = await User.findById(userId);
  const product = await Product.findById(productId);
  
  if(user.cart.includes(productId) !== true){
    user.cart.push(product);
    user.save(user);
    return "Product added to cart";
  }
  else {
    user.cart.remove(product);
    user.save(user);
    return "Product removed from cart";
  }
}

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUserById,
  deleteUserById,
  addProductToWishlist,
  addProductToCart
};
