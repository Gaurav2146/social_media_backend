const productRepository = require('../repositories/product.repositoy');

class productsService {
  constructor() {
    this.productRepository = productRepository;
  }

  addNewProduct(productObject) {
    // eslint-disable-next-line no-async-promise-executor
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
    // eslint-disable-next-line no-async-promise-executor
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
}
module.exports = productsService;
