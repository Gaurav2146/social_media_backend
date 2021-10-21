const brandRepository = require('../repositories/brand.repository');

class brandsService {
  constructor() {
    this.brandRepository = brandRepository;
  }

  async addNewBrand(brandObject) {
    return this.brandRepository.saveBrand(brandObject);
  }

  getAllBrands() {
    return this.brandRepository.getBrands();
  }

  updateBrand(brandID, updatedObj) {
    return this.brandRepository.editBrandDetails(brandID, updatedObj);
  }

  removeBrand(brandID) {
    return this.brandRepository.deleteBrand(brandID);
  }

  getAllFilteredBrands(searchString) {
    return this.brandRepository.filterBrandData(searchString);
  }
}
module.exports = brandsService;
