/* eslint-disable no-param-reassign */
const productRepository = require('../repositories/product.repositoy');

class productsService {
  constructor() {
    this.productRepository = productRepository;
  }

  addNewProduct(productObject) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.productRepository.saveProduct(productObject);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }            

  getAllProducts() {
    return new Promise((resolve, reject) => {
      try {
        const response = this.productRepository.getProducts();
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateProduct(productID, updatedObj) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.productRepository.editProductDetails(productID, updatedObj);
        resolve(response);
      } catch (e) {
        reject(e);                 
      }
    });
  }

  getProductInfo(productID) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.productRepository.getProductDetails(productID);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  removeProduct(productID) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.productRepository.deleteProduct(productID);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  addProductStepOne(productObject) {
    console.log(productObject);
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.productRepository.createProductStepOne(productObject);
        console.log(response);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  addProductStepTwo(productID, productObject) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        productObject.updatedAt = Date.now();
        productObject.product_stepperLastStepVisited = 2;
        const response = await this.productRepository.createProductStepTwo(productID, productObject);
        console.log(response);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  addProductStepThree(productID, color, files, index) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const colorImages = [];
        if (files.length > 0 && files) {
          for (let i = 0; i < files.length; i++) {
            colorImages.push({
              file: files[i].location,
              key: files[i].key,
              contentType: files[i].contentType,
            });
          }
          console.log(colorImages);
        }
        const response = await this.productRepository.createProductStepThree(productID, color, colorImages, index);
        console.log(response);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }
}
module.exports = productsService;
