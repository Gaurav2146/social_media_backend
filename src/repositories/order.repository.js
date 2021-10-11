const Order = require('../model/order');
const Products = require('../model/product');
const mongoose = require('mongoose');
const orderRepository = {

    createOrder : (obj) =>{
    return new Promise(async (resolve, reject) => {
      try {
        let order = await Order.create(obj);
        resolve(order);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  } ,

  updateShippingDetailId  : ({ orderId , ShippingDetailId }) =>{
    return new Promise(async (resolve, reject) => {
      try {
        let order = await Order.findByIdAndUpdate( { _id : orderId } , { $set : { shipping_Detail_Id  : ShippingDetailId  } } , { new : true });
        resolve(order);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  } ,

  getPendingOrders: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let order = await Order.find({ shipping_Detail_Id: null });
        let product_name_arr = [];
        for (let i = 0; i < order.length; i++) {
          console.log(order[i].product_ID, 'order[i].product_ID');
          let product_name = await Products.findById({ _id: order[i].product_ID }, { product_name: 1 });
          product_name_arr.push(product_name.product_name);
        }
        console.log(product_name_arr, 'product_name_arr');
        resolve({ order, product_name_arr });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }

};

module.exports = orderRepository;
