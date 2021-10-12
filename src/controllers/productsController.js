/* eslint-disable no-undef */
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
      const { productID, data, removeImagesProductDetails } = req.body;
      const response = await productService.addProductStepTwo(productID, data, removeImagesProductDetails);
      console.log(response);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  createProductStepThree: async function (req, res, next) {
    try {
      const { productID, color, typeOfProduct } = req.body;
      console.log(req.body);
      const productVariantImages = req.files;
      console.log(req.files);
      const response = await productService.addProductStepThree(productID, color, productVariantImages, typeOfProduct);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  updateImagesForVariants: async function (req, res, next) {
    try {
      const { productID, color, typeOfProduct } = req.body;
      const variantIndex = parseInt(req.body.variantIndex, 10);
      let imagesDeletedArray = req.body.deletedImagesArrayOnEditing;
      imagesDeletedArray = JSON.parse(imagesDeletedArray);
      const imagesAddedArray = req.files;
      console.log(productID, color, variantIndex, imagesDeletedArray, imagesAddedArray);
      const response = await productService.updateImagesForVariants(
        productID,
        color,
        imagesAddedArray,
        variantIndex,
        imagesDeletedArray,
        typeOfProduct,
      );
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  addNFTImage: async function (req, res, next) {
    try {
      const { productID } = req.body;
      const nftImage = req.file;
      const response = await productService.addNFTImage(productID, nftImage);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  updateNFTImage: async function (req, res, next) {
    try {
      const { productID, nftDeleteImage } = req.body;
      const nftImage = req.file;
      const response = await productService.updateNFTImage(productID, nftImage, nftDeleteImage);
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
      return res.status(200).json({ success: true, data: response });
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
      const { skip, limit, search, filterType, collection } = req.query;
      const response = await productService.getAllProducts(skip, limit, search, filterType, collection);
      let { productDetail, totalProducts } = response;
      return res.status(200).json({ success: true, data: productDetail, totalProducts: totalProducts, msg: 'All Products Fetched' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getFilteredProducts: async function (req, res, next) {
    try {
      const { productSearchValue } = req.body;
      if (productSearchValue === null || productSearchValue === undefined) {
        return;
      }
      const response = await productService.getAllFilteredProducts(productSearchValue);
      return res.status(200).json({ success: true, data: response, msg: 'All Products Fetched' });
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
      return res.status(200).json({ success: true, data: response[0], msg: 'Selected Product Info Fetched' });
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
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getProductsForAdmin: async function (req, res, next) {
    try {
      const response = await productService.getProductsForAdmin();
      res.status(200).json({ success: true, data: response });
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
