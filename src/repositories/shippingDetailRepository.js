const ShippingDetail = require('../model/shippingDetail');

const shippingDetailRepository = {

    addShippingDetail: (obj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let shipping_detail = await ShippingDetail.create(obj)
        resolve(shipping_detail);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }
}

module.exports = shippingDetailRepository;