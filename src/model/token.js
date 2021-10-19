/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  TokenType: {
    type: String,
    require: true,
    trim: true,
  },
  TokenName: {
    type: String,
    require: true,
    trim: true,
  },
  Symbol: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  ContractAddress: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  ContractABI: {
    type: String,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    trim: true,
  },
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
