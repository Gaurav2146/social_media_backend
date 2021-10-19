/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const shippingDetailSchema = new mongoose.Schema({
  product_ID: {
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  },
  Wallet_ID: {
    type: String,
    required: true,
    trim: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_color: {
    type: String,
    required: true,
    trim: true,
  },
  product_size: {
    type: String,
    required: true,
    trim: true,
  },
  product_quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  StreetAddress: {
    type: String,
    trim: true,
    required: true,
  },
  City_Province: {
    type: String,
    required: true,
    trim: true,
  },
  State: {
    type: String,
    required: true,
    trim: true,
  },
  Zip: {
    type: String,
    trim: true,
    required: true,
  },
  Country: {
    type: String,
    trim: true,
    required: true,
  },
  Email: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ShippingDetail = mongoose.model('ShippingDetail', shippingDetailSchema);

module.exports = ShippingDetail;
