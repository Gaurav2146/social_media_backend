const Order = require('../model/order');
const Products = require('../model/product');
const mongoose = require('mongoose');
const OrderCounter = require('../model/orderIdCounter');
var AsyncLock = require('async-lock');
var lock = new AsyncLock();
const orderRepository = {
  createOrder: (obj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let curr_order_id_to_put_lock = await OrderCounter.find();
        console.log(curr_order_id_to_put_lock, 'curr_order_id_to_put_lock');
        let order_id_to_put_lock;
        if (curr_order_id_to_put_lock.length === 0) {
          order_id_to_put_lock = '000001';
        } else {
          order_id_to_put_lock = curr_order_id_to_put_lock[0].orderIdCounter;
        }

        // Aquiring Lock On current Order Id
        lock.acquire(
          order_id_to_put_lock,
          async function (done) {
            try {
              let order_count = await OrderCounter.find();
              console.log(order_count, 'order_count');
              let order_id;
              if (order_count.length === 0) {
                order_id = '000001';
                let order_counter = new OrderCounter({ orderIdCounter: '000002' });
                let detail = await order_counter.save();
                console.log(detail, 'detail');
              } else {
                let dummy = '000000';
                order_id = order_count[0].orderIdCounter;
                let no_of_zeroes = 0;
                for (let i = 0; i < order_id.length; i++) {
                  if (order_id[i] === '0') {
                    no_of_zeroes++;
                    break;
                  }
                }
                let order_no = Number(order_id.substring(no_of_zeroes));
                order_no++;
                let string_order_no = dummy.substring(0, 6 - order_no.toString().length) + order_no.toString();
                await OrderCounter.findOneAndUpdate({ orderIdCounter: string_order_no });
              }
              obj['orderId'] = order_id;
              let order = await Order.create(obj);

              done(null, order);
            } catch (error) {
              console.log(error);
              done(new Error('error'));
            }
          },
          function (err, ret) {
            if (err) {
              console.log(err);
              reject(err);
            }
            console.log(ret, 'Created Order');
            resolve(ret);
          },
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  updateShippingDetailId: ({ orderId, ShippingDetailId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let order = await Order.findByIdAndUpdate({ _id: orderId }, { $set: { shipping_Detail_Id: ShippingDetailId } }, { new: true });
        resolve(order);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  getPendingOrders: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let order = await Order.aggregate([
          { $match: { shipping_Detail_Id: null } },
          { $match: { Wallet_ID: id } },
          {
            $lookup: {
              from: 'products',
              let: { product_ID: '$product_ID' },
              pipeline: [{ $match: { $expr: { $eq: ['$$product_ID', '$_id'] } } }, { $project: { product_name: 1, _id: 0 } }],
              as: 'productDetail',
            },
          },
          { $unwind: '$productDetail' },
        ]);
        resolve({ order });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  getAllOrders: (id, search) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (id) {
          let order = await Order.aggregate([
            { $match: { Wallet_ID: id } },
            {
              $lookup: {
                from: 'products',
                let: { product_ID: '$product_ID' },
                pipeline: [{ $match: { $expr: { $eq: ['$$product_ID', '$_id'] } } }],
                as: 'productDetail',
              },
            },
            { $unwind: '$productDetail' },
            {
              $lookup: {
                from: 'shippingdetails',
                let: { shipping_Detail_Id: '$shipping_Detail_Id' },
                pipeline: [{ $match: { $expr: { $eq: ['$$shipping_Detail_Id', '$_id'] } } }],
                as: 'shippingDetail',
              },
            },
            { $unwind: '$shippingDetail' },
          ]);
          resolve(order);
        } else {
          let filter_for_order_with_shipping_details = [
            {
              $lookup: {
                from: 'products',
                localField: 'product_ID',
                foreignField: '_id',
                as: 'productDetail',
              },
            },
            { $unwind: '$productDetail' },
            {
              $lookup: {
                from: 'shippingdetails',
                localField: 'shipping_Detail_Id',
                foreignField: '_id',
                as: 'shippingDetail',
              },
            },
            { $unwind: '$shippingDetail' },
          ];

          if (search) {
            let filter = {
              $match: {
                orderId: { $regex: search, $options: '-i' },
                Wallet_ID: { $regex: search, $options: '-i' },
              },
            };

            filter_for_order_with_shipping_details.unshift(filter);
          }

          let order_with_shipping_details = await Order.aggregate(filter_for_order_with_shipping_details);

          let filter_for_order_without_shipping_details = [
            {
              $lookup: {
                from: 'products',
                localField: 'product_ID',
                foreignField: '_id',
                as: 'productDetail',
              },
            },
            { $unwind: '$productDetail' },
            { $match: { shipping_Detail_Id: null } },
          ];

          if (search) {
            if (search) {
              let filter = {
                $match: {
                  $or: [
                    { orderId: { $regex: search, $options: '-i' } },

                    { Wallet_ID: { $regex: search, $options: '-i' } },

                    { product_price: { $regex: search, $options: '-i' } },

                    { product_color: { $regex: search, $options: '-i' } },

                    { product_quantity: { $regex: search, $options: '-i' } },

                    { product_size: { $regex: search, $options: '-i' } },
                  ],
                },
              };
              filter_for_order_without_shipping_details.unshift(filter);
            }
          }

          let order_without_shipping_details = await Order.aggregate(filter_for_order_without_shipping_details);

          let order = [...order_with_shipping_details, ...order_without_shipping_details];

          resolve(order);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
};

module.exports = orderRepository;
