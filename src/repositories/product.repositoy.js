const Products = require('../model/product');

const productsRepository = {

  saveProduct: (productObject) => {
    return new Promise(async (resolve, reject) => {
      try {
        let product_detail = await Products.create(productObject);
        resolve(product_detail);
      } catch (error) {
        reject(error);
      }
    })
  },

  getProducts: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let product_detail = await Products.find();
        resolve(product_detail);
      } catch (error) {
        reject(error);
      }
    })
  },

  getProductDetails: (productID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let product_detail = await Products.find({ _id: productID });
        resolve(product_detail);
      } catch (error) {
        reject(error);
      }
    })
  },

  editProductDetails: (productID, productObject) => {
    return new Promise(async (resolve, reject) => {
      try {
        let product_detail = await Products.findByIdAndUpdate({ _id: productID }, productObject, { new: true });
        resolve(product_detail);
      } catch (error) {
        reject(error);
      }
    })
  },

  deleteProduct: (productID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let product_detail = await Products.findByIdAndDelete({ _id: productID });
        resolve(product_detail);
      } catch (error) {
        reject(error);
      }
    })
  }

};

module.exports = productsRepository;
