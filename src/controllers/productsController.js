/* eslint-disable consistent-return */
const isHttpError = require('http-errors');
const ProductsService = require('../services/productsService');
const productService = new ProductsService();

const productCtlr = {
  createProductStepOne: async function (req, res, next) {
    try {
      const productObject = req.body;
      const response = await productService.addProductStepOne(productObject);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  createProductStepTwo: async function (req, res, next) {
    try {
      console.log(req.body);
      const { productID, data } = req.body;
      const response = await productService.addProductStepTwo(productID, data);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  updateProduct: async function (req, res, next) {
    try {
      const { productID, productObject } = req.body;
      const response = await productService.updateProduct(productID, productObject);
      res.status(200).json(response);
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getProducts: async function (req, res, next) {
    try {
      const response = await productService.getAllProducts();
      res.status(200).json(response);
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getSelectedProductInfo: async function (req, res, next) {
    try {
      const { productID } = req.body;
      const response = await productService.getProductInfo(productID);
      res.status(200).json(response);
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  deleteProduct: async function (req, res, next) {
    try {
      const { productID } = req.body;
      const response = await productService.removeProduct(productID);
      res.status(200).json(response);
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
};

module.exports = productCtlr;
