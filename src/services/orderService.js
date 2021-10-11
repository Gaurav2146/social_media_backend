/* eslint-disable no-async-promise-executor */
/* eslint-disable no-param-reassign */
const orderRepository = require('../repositories/order.repository');

class orderService {
  constructor() {
    this.orderRepository = orderRepository;
  }

  createOrder(obj) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.orderRepository.createOrder(obj);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateShippingDetailId({ orderId , ShippingDetailId })
  {
    return new Promise((resolve, reject) => {
        try {
          const response = this.orderRepository.updateShippingDetailId({ orderId , ShippingDetailId });
          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
  }

  getPendingOrders()
  {
    return new Promise((resolve, reject) => {
        try {
          const response = this.orderRepository.getPendingOrders();
          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
  }

  getAllOrders()
  {
    return new Promise((resolve, reject) => {
      try {
        const response = this.orderRepository.getAllOrders();
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

}
module.exports = orderService;
