const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    fullname: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
    country: Joi.string().required().valid('Kosovo', 'Albania'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    fullname: Joi.string(),
    country: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
  query: Joi.object().keys({
    username: Joi.string(),
    fullname: Joi.string(),
    country: Joi.string(),
    wishlist: Joi.array().items(),
    cart: Joi.array().items(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const addWishlistForUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
    productId: Joi.string(),

  }),
  query: Joi.object().keys({
    username: Joi.string(),
    fullname: Joi.string(),
    country: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    wishlist:  Joi.array().items(),
    cart: Joi.array().items(),
    page: Joi.number().integer(),
  }),
};

const addCartForUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
    productId: Joi.string(),

  }),
  query: Joi.object().keys({
    username: Joi.string(),
    fullname: Joi.string(),
    country: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    wishlist:  Joi.array().items(),
    cart: Joi.array().items(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addWishlistForUser,
  addCartForUser
};
