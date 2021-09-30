/* eslint-disable no-param-reassign */
/* eslint-disable no-async-promise-executor */
const Brands = require('../model/brand');

const brandsRepository = {
  saveBrand: (brandObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const brandDetail = await Brands.create(brandObject);
        resolve(brandDetail);
      } catch (error) {
        reject(error);
      }
    }),

  getBrands: () =>
    new Promise(async (resolve, reject) => {
      try {
        const brandDetail = await Brands.find().sort({ brand_updatedAt: -1 });
        resolve(brandDetail);
      } catch (error) {
        reject(error);
      }
    }),

  filterBrandData: (searchvalue) =>
    new Promise(async (resolve, reject) => {
      try {
        const brandDetail = await Brands.aggregate([
          { $match: { brand_name: { $regex: searchvalue, $options: 'i' } } },
          { $sort: { brand_updatedAt: -1 } },
          {
            $project: {
              brand_name: 1,
              brand_createdAt: 1,
              brand_updatedAt: 1,
            },
          },
        ]);
        resolve(brandDetail);
      } catch (error) {
        reject(error);
      }
    }),

  editBrandDetails: (brandID, brandObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const brandDetail = await Brands.findByIdAndUpdate({ _id: brandID }, { $set: brandObject }, { new: true });
        resolve(brandDetail);
      } catch (error) {
        reject(error);
      }
    }),

  deleteBrand: (brandID) =>
    new Promise(async (resolve, reject) => {
      try {
        const brandDetail = await Brands.findByIdAndDelete({ _id: brandID });
        resolve(brandDetail);
      } catch (error) {
        reject(error);
      }
    }),
};

module.exports = brandsRepository;
