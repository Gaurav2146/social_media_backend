const express = require('express');
const router = express.Router();
const orderCtl = require('../controllers/orderController');
var app = express();
const jwt = require('express-jwt');

let auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }), async function (req, res, next) {
  console.log(req.user, 'inside jwt');
  next();
});

/**
 * create Order in database
 * @route POST /order/createOrder
 * @group Upload API - Endpoints to create Order
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/createOrder', orderCtl.createOrder);


/**
 * update Order in database
 * @route POST /order/updateOrder
 * @group Upload API - Endpoints to update Order
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateOrder', orderCtl.updateOrder);

/**
 * update Shipping Detail in database
 * @route POST /order/updateShippingDetailId
 * @group Upload API - Endpoints to update Shipping Detail Id
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateShippingDetailId', orderCtl.updateShippingDetailId);

/**
 * get Pending Orders from database
 * @route GET /order/getPendingOrders
 * @group Upload API - Endpoints to get Pending Orders
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/getPendingOrders', orderCtl.getPendingOrders);

/**
 * get All Orders from database
 * @route GET /order/getAllOrders
 * @group Upload API - Endpoints to get All Orders
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/getAllOrders', orderCtl.getAllOrders);



/**
 * update Order Payment Amount in database
 * @route GET /order/updateOrderPaymentAmount
 * @group Upload API - Endpoints update Order Payment Amount
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/updateOrderPaymentAmount', orderCtl.updateOrderPaymentAmount);

module.exports = router;
