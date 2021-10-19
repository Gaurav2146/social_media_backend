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
  },

  updateShippingDetailId: async function (req, res, next) {
    try {
      const { orderId, ShippingDetailId } = req.body;
      let order_detail = await order_service.updateShippingDetailId({ orderId, ShippingDetailId });
      res.status(200).json({ success: true, order_detail: order_detail });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  getPendingOrders: async function (req, res, next) {
    try {
      let { id } = req.query;
      let pending_orders = await order_service.getPendingOrders(id);
      res.status(200).json({ success: true, pending_orders: pending_orders });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  getAllOrders: async function (req, res, next) {
    try {
      let { id, search } = req.query;
      let all_orders = await order_service.getAllOrders(id, search);
      res.status(200).json({ success: true, all_orders: all_orders });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
};

module.exports = orderCtl;
