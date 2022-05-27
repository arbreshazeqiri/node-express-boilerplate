const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: false,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: false,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: false,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      default: false,
      trim: true,
    },
    quantity: {
      type: String,
      default: false,
      required: true,
      trim:true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);



/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
