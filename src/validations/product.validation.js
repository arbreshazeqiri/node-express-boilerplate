const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.string().required(),
    quantity: Joi.string().required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    image: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.string(),
    quantity: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
  productId: Joi.string(),
  }),
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.string(),
    quantity: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.string(),
    quantity: Joi.string(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
