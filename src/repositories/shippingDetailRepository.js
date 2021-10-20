const ShippingDetail = require('../model/shippingDetail');
const Order = require('../model/order');

const shippingDetailRepository = {
  addShippingDetail: (obj, Order_Id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let product_color = obj['product_color'];
        if(!product_color)
        {
          obj['product_color'] = 'N.A';
        }
        let product_size = obj['product_size'];
        if(!product_size)
        {
          obj['product_size'] = 'N.A';
        }
        let shipping_detail = await ShippingDetail.create(obj);
        let order = await Order.findByIdAndUpdate({ _id: Order_Id }, { $set: { shipping_Detail_Id: shipping_detail._id } });
        resolve({ shipping_detail, order: order });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
};

module.exports = shippingDetailRepository;
