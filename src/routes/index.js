const admin = require('./admin-route');
const user = require('./user-route');
const product = require('./products-route');
const brand = require('./brand-route');
const tags = require('./tags-route');
const smartContract = require('./smart-contract-route');
const token = require('./token-route');

module.exports = {
  admin,
  user,
  product,
  brand,
  tags,
  smartContract,
  token,
};
