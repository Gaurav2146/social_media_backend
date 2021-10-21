/* eslint-disable no-async-promise-executor */
/* eslint-disable no-param-reassign */
const productRepository = require('../repositories/product.repository');

const deleteImagesFile = require('../route_middleware/deleteImages');

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

  getAllProducts(skip, limit, search, filterType, collection) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.productRepository.getProducts(skip, limit, search, filterType, collection);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateProduct(productID, updatedObj) {
    return new Promise((resolve, reject) => {
      try {
        updatedObj.product_updatedAt = Date.now();
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
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.productRepository.createProductStepOne(productObject);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  addProductStepTwo(productID, productObject, removeImagesProductDetails) {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedImageArray = [];
        const deleteImagesFromDatabase = [];
        if (removeImagesProductDetails && removeImagesProductDetails.length > 0) {
          removeImagesProductDetails.forEach((element) => {
            if (element.images && element.images.length > 0) {
              element.images.forEach((image) => {
                deletedImageArray.push({ Key: image.key });
                deleteImagesFromDatabase.push({ key: image.key });
              });
            }
          });
        }
        await deleteImagesFile.deleteSelectedFiles(deletedImageArray);
        productObject.updatedAt = Date.now();
        if (productObject.product_stepperLastStepVisited === 1) {
          productObject.product_stepperLastStepVisited = 2;
        }
        const response = await this.productRepository.createProductStepTwo(productID, productObject, removeImagesProductDetails);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateImagesForVariants(productID, color, imagesAddedArray, variantIndex, imagesDeletedArray, typeOfProduct) {
    return new Promise(async (resolve, reject) => {
      try {
        const colorImages = [];
        if (imagesAddedArray && imagesAddedArray.length > 0) {
          for (let i = 0; i < imagesAddedArray.length; i++) {
            colorImages.push({
              file: imagesAddedArray[i].location,
              key: imagesAddedArray[i].key,
              contentType: imagesAddedArray[i].contentType,
            });
          }
        }
        await deleteImagesFile.deleteSelectedFiles(imagesDeletedArray);
        const response = await this.productRepository.updateImagesForColorVariant(
          productID,
          color,
          colorImages,
          variantIndex,
          imagesDeletedArray,
          typeOfProduct,
        );
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  addProductStepThree(productID, color, files, typeOfProduct) {
    return new Promise(async (resolve, reject) => {
      try {
        const productImages = [];
        if (files.length > 0 && files) {
          for (let i = 0; i < files.length; i++) {
            productImages.push({
              file: files[i].location,
              key: files[i].key,
              contentType: files[i].contentType,
            });
          }
        }
        const response = await this.productRepository.createProductStepThree(productID, color, productImages, typeOfProduct);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  addNFTImage(productID, image) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedObject = {
          nft_image: {
            file: image.location,
            key: image.key,
            contentType: image.contentType,
          },
          updatedAt: Date.now(),
          product_stepperStatus: true,
        };
        const response = await this.productRepository.editProductDetails(productID, updatedObject);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateNFTImage(productID, image, nftDeleteImage) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedObject = {
          nft_image: {
            file: image.location,
            key: image.key,
            contentType: image.contentType,
          },
          updatedAt: Date.now(),
        };
        await deleteImagesFile.deleteSelectedFiles([{ Key: nftDeleteImage }]);
        const response = await this.productRepository.editProductDetails(productID, updatedObject);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllFilteredProducts(searchString, pageIndex, limit) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.productRepository.filterProductData(searchString, pageIndex, limit);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getProductsForAdmin(pageIndex, limit) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.productRepository.getProductsAdmin(pageIndex, limit);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateProductQuantity(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.productRepository.updateProductQuantity(obj);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = productsService;
