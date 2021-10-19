const express = require('express');
var jwt = require('express-jwt');
const router = express.Router();
const shippingDetailCtl = require('../controllers/shippingDetailController');
var app = express();

let auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }), async function (req, res, next) {
  console.log(req.user, 'inside jwt');
  next();
});

/**
 * get Address Balance from Blockchain
 * @route POST /smartContract/addShippingDetail
 * @group Upload API - Endpoints to get Address Balance
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/addShippingDetail', shippingDetailCtl.addShippingDetail);

module.exports = router;
