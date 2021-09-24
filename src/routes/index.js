const admin = require('./admin-route');
const user = require('./user-route');
const product = require('./products-route');
const smartContract = require('./smart-contract-route');

module.exports = {
  admin,
  user,
  product,
  smartContract,
};
