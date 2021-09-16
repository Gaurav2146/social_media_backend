/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, 'this email is already taken'],
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

UserSchema.index(
  { status: -1 },
  {
    background: true,
  },
); // schema level

UserSchema.index(
  { email: -1, status: -1 },
  {
    background: true,
  },
); // schema level

UserSchema.index(
  { name: -1 },
  {
    background: true,
  },
); // schema level

UserSchema.index(
  { createdAt: -1 },
  {
    background: true,
  },
); // schema level

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
