/* eslint-disable camelcase */
const ShippingDetail = require('../model/shippingDetail');
const Order = require('../model/order');

const shippingDetailRepository = {
  addShippingDetail: (obj, Order_Id) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      try {
        const { product_color } = obj;
        if (!product_color) {
          // eslint-disable-next-line no-param-reassign
          obj.product_color = 'N.A';
        }
        const { product_size } = obj;
        if (!product_size) {
          // eslint-disable-next-line no-param-reassign
          obj.product_size = 'N.A';
        }
        const shipping_detail = await ShippingDetail.create(obj);
        let order;
        if (obj.eth_transaction_hash) {
          order = await Order.findByIdAndUpdate(
            { _id: Order_Id },
            { $set: { shipping_Detail_Id: shipping_detail._id, eth_transaction_hash: obj.eth_transaction_hash } },
          );
        } else {
          order = await Order.findByIdAndUpdate({ _id: Order_Id }, { $set: { shipping_Detail_Id: shipping_detail._id } });
        }
        resolve({ shipping_detail, order: order });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),
};

module.exports = shippingDetailRepository;
