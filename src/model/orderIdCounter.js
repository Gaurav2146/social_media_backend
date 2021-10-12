/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const orderIdCounterSchema = new mongoose.Schema({

  orderIdCounter:{
    type: String,
    required: true,       
    trim: true
  },
 
});

const OrderCounter = mongoose.model('OrderCounter', orderIdCounterSchema);

module.exports = OrderCounter;
