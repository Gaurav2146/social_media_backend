const Brands = require('../model/brand');

const brandsRepository = {
  saveBrand: (brandObject) => Brands.create(brandObject),

  getBrands: () => Brands.find().sort({ brand_updatedAt: -1 }),

  filterBrandData: (searchvalue) =>
    Brands.aggregate([
      { $match: { brand_name: { $regex: searchvalue, $options: 'i' } } },
      { $sort: { brand_updatedAt: -1 } },
      {
        $project: {
          brand_name: 1,
          brand_createdAt: 1,
          brand_updatedAt: 1,
        },
      },
    ]),

  editBrandDetails: (brandID, brandObject) => Brands.findByIdAndUpdate({ _id: brandID }, { $set: brandObject }, { new: true }),

  deleteBrand: (brandID) => Brands.findByIdAndDelete({ _id: brandID }),
};

module.exports = brandsRepository;
