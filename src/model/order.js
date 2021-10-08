/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  product_ID:{
    type: String,
    required: true,       
    trim: true
  },
  Wallet_ID:{
    type: String,
    required: true,       
    trim: true
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_color: {
    type: String,
    required: true,
    trim: true
  },
  product_size : {
    type: String,
    required: true,
    trim: true
  },
  product_quantity : {
    type: Number,
    required: true,
  },
  Product_image: {
    type: Array,
    required: true,
  },
  nft_image: {
    type: Object,
    required: true,
  },
  shipping_Detail_Id:{
    type: mongoose.Types.ObjectId,
    default : null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
