const Order = require('../model/order');
const Products = require('../model/product');
const mongoose = require('mongoose');
const OrderCounter = require('../model/orderIdCounter');
const orderRepository = {

    createOrder : (obj) =>{
    return new Promise(async (resolve, reject) => {
      try {
        let order_count = await OrderCounter.find();
         console.log( order_count , 'order_count' );
         let order_id;
         if(order_count.length === 0 )
         {
             order_id = '000001';   
             let order_counter = new OrderCounter(
               { orderIdCounter :  '000002' }
             );
          let detail = await order_counter.save();
          console.log( detail , 'detail' );
         }
         else
         {
          let dummy = "000000"
          order_id = order_count[0].orderIdCounter;
          let no_of_zeroes = 0;
          for(let i=0; i < order_id.length; i++)
          {
            if(order_id[i] === '0')
            {
              no_of_zeroes++;
              break;
            }
          }
          let order_no = Number( order_id.substring(no_of_zeroes) );
          order_no++;
          let string_order_no =   dummy.substring( 0 , 6 - order_no.toString().length)  + order_no.toString();
          await OrderCounter.findOneAndUpdate( {  orderIdCounter : string_order_no  } );
         }
         obj['orderId'] = order_id;
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
          { $match :  {shipping_Detail_Id: null } } ,
          { $match : { Wallet_ID : id } },
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
