const Order = require('../model/order');
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

};

module.exports = orderRepository;
