const express = require('express');
const router = express.Router();
const orderCtl = require('../controllers/orderController');
var app = express();
const jwt = require('express-jwt');

let auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }),
    async function (req, res, next) {
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


module.exports = router;
