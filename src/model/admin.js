/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  email_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    trim: true,
    default: 'Inactive',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
