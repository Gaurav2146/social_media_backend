/* eslint-disable consistent-return */
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const orderService = require('../services/orderService');
const order_service = new orderService();

const orderCtl = {

    createOrder: async function (req, res, next) {
        try {
            const obj = req.body;
            let order_detail = await order_service.createOrder(obj);
            res.status(200).json({ success: true, order_detail: order_detail });
        } catch (e) {
            if (isHttpError(e)) {
                next(e);
            } else {
                return res.status(400).json({ message: 'something went wrong!' });
            }
        }
    }

}


module.exports = orderCtl;
