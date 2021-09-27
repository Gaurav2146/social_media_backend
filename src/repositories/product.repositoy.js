/* eslint-disable no-async-promise-executor */
const Products = require('../model/product');

const productsRepository = {
  saveProduct: (productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.create(productObject);
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  getProducts: () =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.find();
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  getProductDetails: (productID) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.find({ _id: productID });
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  editProductDetails: (productID, productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findByIdAndUpdate({ _id: productID }, productObject, { new: true });
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  deleteProduct: (productID) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findByIdAndDelete({ _id: productID });
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  createProductStepOne: (productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productCreate = await Products.create(productObject);
        resolve(productCreate);
      } catch (error) {
        reject(error);
      }
    }),

  createProductStepTwo: (productID, productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productUpdate = await Products.findByIdAndUpdate({ _id: productID }, { $set: productObject }, { new: true });
        resolve(productUpdate);
      } catch (error) {
        reject(error);
      }
    }),

  createProductStepThree: (productID, color, imagesArray) =>
    new Promise(async (resolve, reject) => {
      try {
        const productUpdate = await Products.findByIdAndUpdate(
          {
            _id: productID,
            product_colorAndSizeDetails: {
              $elemMatch: {
                'colorDetails.color': color,
              },
            },
          },
          {
            $set: {
              'product_colorAndSizeDetails.$[outer].images': imagesArray,
            },
          },
          {
            arrayFilters: [{ 'outer.colorDetails.color': color }],
          },
          (err, result) => {
            if (err) {
              console.log(`Error updating service: ${err}`);
            } else {
              console.log(`${result} document(s) updated`);
            }
          },
        );
        resolve(productUpdate);
      } catch (error) {
        reject(error);
      }
    }),
};

module.exports = productsRepository;
