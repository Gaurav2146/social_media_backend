const { InternalServerError } = require('http-errors');

const isHttpError = require('http-errors');

const ProductsService = require('../services/productsService');

const productService = new ProductsService();

const productCtlr = {
  createProductStepOne: async function (req, res, next) {
    try {
      const productObject = req.body;
      const response = await productService.addProductStepOne(productObject);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  createProductStepTwo: async function (req, res, next) {
    try {
      const { productID, data } = req.body;
      console.log(req.body);
      const response = await productService.addProductStepTwo(productID, data);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      console.log(e);
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  createProductStepThree: async function (req, res, next) {
    try {
      const { productID, color, typeOfProduct } = req.body;
      const productVariantImages = req.files;
      const response = await productService.addProductStepThree(productID, color, productVariantImages, typeOfProduct);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  updateImagesForVariants: async function (req, res, next) {
    try {
      const { productID, color, typeOfProduct } = req.body;
      const variantIndex = parseInt(req.body.variantIndex, 10);
      const imagesDeletedArray = JSON.parse(req.body.deletedImagesArrayOnEditing);
      // imagesDeletedArray = JSON.parse(imagesDeletedArray);
      const imagesAddedArray = req.files;
      const response = await productService.updateImagesForVariants(
        productID,
        color,
        imagesAddedArray,
        variantIndex,
        imagesDeletedArray,
        typeOfProduct,
      );
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  addNFTImage: async function (req, res, next) {
    try {
      const { productID } = req.body;
      const nftImage = req.file;
      const response = await productService.addNFTImage(productID, nftImage);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  updateNFTImage: async function (req, res, next) {
    try {
      const { productID, nftDeleteImage } = req.body;
      const nftImage = req.file;
      const response = await productService.updateNFTImage(productID, nftImage, nftDeleteImage);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  updateProduct: async function (req, res, next) {
    try {
      const { productID, productObject } = req.body;
      const response = await productService.updateProduct(productID, productObject);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  getProducts: async function (req, res, next) {
    try {
      const { skip, limit, search, filterType, collection } = req.query;
      const response = await productService.getAllProducts(skip, limit, search, filterType, collection);
      const { productDetail, totalProducts } = response;
      res.status(200).json({ success: true, data: productDetail, totalProducts: totalProducts, msg: 'All Products Fetched' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  getFilteredProducts: async function (req, res, next) {
    try {
      const { productSearchValue } = req.body;
      let { pageIndex, limit } = req.body;
      pageIndex -= 1;
      limit = parseInt(limit, 10);
      if (productSearchValue === null || productSearchValue === undefined) {
        return;
      }
      const response = await productService.getAllFilteredProducts(productSearchValue, pageIndex, limit);
      res
        .status(200)
        .json({ success: true, data: response.productDetail, totalSize: response.productTotalSize, msg: 'All Products Fetched' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  getSelectedProductInfo: async function (req, res, next) {
    try {
      const { productID } = req.body;
      const response = await productService.getProductInfo(productID);
      res.status(200).json({ success: true, data: response[0], msg: 'Selected Product Info Fetched' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  deleteProduct: async function (req, res, next) {
    try {
      const { productID } = req.body;
      const response = await productService.removeProduct(productID);
      res.status(200).json({ success: true, data: response, msg: 'Product Deleted Successfully!' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  getProductsForAdmin: async function (req, res, next) {
    try {
      let { pageIndex, limit } = req.body;
      pageIndex -= 1;
      limit = parseInt(limit, 10);
      const response = await productService.getProductsForAdmin(pageIndex, limit);
      res
        .status(200)
        .json({ success: true, data: response.productDetail, totalSize: response.productTotalSize, msg: 'All Products Fetched!' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },

  updateProductQuantity: async function (req, res, next) {
    try {
      const obj = req.body;
      const response = await productService.updateProductQuantity(obj);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },

  getProductDetailsById: async function (req, res, next) {
    try {
      const { productId } = req.query;
      const response = await productService.getProductDetailsById(productId);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
};

module.exports = productCtlr;
