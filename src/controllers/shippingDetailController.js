/* eslint-disable consistent-return */
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const shippingDetailService = require('../services/shippingDetailService');
const shipping_detail_service = new shippingDetailService();

const shippingDetailCtl = {
 
    addShippingDetail : async function (req, res, next) {                                         
    try {
      const { name , StreetAddress , City_Province ,  State , Zip , Country , Email , product_color , product_price , product_quantity , product_size , Wallet_ID , product_ID , Order_Id } = req.body;
      let shipping_detail = await shipping_detail_service.addShippingDetail({ name , StreetAddress , City_Province ,  State , Zip , Country , Email , product_color , product_price , product_quantity , product_size , Wallet_ID , product_ID } , Order_Id );
      res.status(200).json({ success : true , shipping_detail : shipping_detail });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  }
  
}

module.exports = shippingDetailCtl;
