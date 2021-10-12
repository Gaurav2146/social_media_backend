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

  getPendingOrders: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let order = await Order.aggregate([
          { $match : {  shipping_Detail_Id: null , Wallet_ID : id } },
          {
            $lookup: {
              from: 'products',
              let: { product_ID: '$product_ID' },
              pipeline: [{ $match: { $expr: { $eq: ['$$product_ID', '$_id'] } } } , { $project : {  product_name : 1 , _id : 0 } }],
              as: 'productDetail',
            }
          },
          { $unwind :  '$productDetail' }
        ])
        resolve({ order });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },

  getAllOrders: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let order = await Order.aggregate([
          {
            $lookup: {
              from: 'products',
              let: { product_ID: '$product_ID' },
              pipeline: [{ $match: { $expr: { $eq: ['$$product_ID', '$_id'] } } }],
              as: 'productDetail',
            }
          },
          { $unwind :  '$productDetail' },
          {
            $lookup: {
              from: 'shippingdetails',
              let: { shipping_Detail_Id: '$shipping_Detail_Id' },
              pipeline: [{ $match: { $expr: { $eq: ['$$shipping_Detail_Id', '$_id'] } } }],
              as: 'shippingDetail',
            }
          },
          { $unwind :  '$shippingDetail' },
        ])
        resolve(order);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }

};

module.exports = orderRepository;
