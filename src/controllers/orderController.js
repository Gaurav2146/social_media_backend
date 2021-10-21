/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
const isHttpError = require('http-errors');
// eslint-disable-next-line import/newline-after-import
const orderService = require('../services/orderService');
const order_service = new orderService();

const orderCtl = {
  createOrder: async function (req, res, next) {
    try {
      const obj = req.body;
      const order_detail = await order_service.createOrder(obj);
      res.status(200).json({ success: true, order_detail: order_detail });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  updateOrder: async function (req, res, next) {
    try {
      const { id, eth_transaction_hash } = req.body;
      console.log(req.body, 'updateOrder');
      const order_detail = await order_service.updateOrder(id, eth_transaction_hash);
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
      const order_detail = await order_service.updateShippingDetailId({ orderId, ShippingDetailId });
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
      const { id } = req.query;
      // eslint-disable-next-line camelcase
      const pending_orders = await order_service.getPendingOrders(id);
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
      const { id, search } = req.query;
      // eslint-disable-next-line camelcase
      const all_orders = await order_service.getAllOrders(id, search);
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
