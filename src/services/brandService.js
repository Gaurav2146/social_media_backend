/* eslint-disable no-async-promise-executor */
/* eslint-disable no-param-reassign */
const brandRepository = require('../repositories/brand.repository');

class brandsService {
  constructor() {
    this.brandRepository = brandRepository;
  }

  addNewBrand(brandObject) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.brandRepository.saveBrand(brandObject);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllBrands() {
    return new Promise((resolve, reject) => {
      try {
        const response = this.brandRepository.getBrands();
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateBrand(brandID, updatedObj) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.brandRepository.editBrandDetails(brandID, updatedObj);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  removeBrand(brandID) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.brandRepository.deleteBrand(brandID);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllFilteredBrands(searchString) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.brandRepository.filterBrandData(searchString);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }
}
module.exports = brandsService;
