const Products = require('../model/product');

const productsRepository = {
  saveProduct: (productObject) => Products.create(productObject),

  getProducts: () => Products.find(),

  getProductDetails: (productID) => Products.find({ _id: productID }),

  editProductDetails: (productID, productObject) => Products.findByIdAndUpdate({ _id: productID }, productObject, { new: true }),

  deleteProduct: (productID) => Products.findByIdAndDelete({ _id: productID }),

  createProductStepOne: (productObject) => Products.create(productObject),

  createProductStepTwo: (productID, productObject) =>
    Products.findByIdAndUpdate({ _id: productID }, { $set: productObject }, { new: true }),

  createProductStepThree: (productID, color, imagesArray, index) =>
    Products.findByIdAndUpdate(
      {
        _id: productID,
        product_colorAndSizeDetails: {
          $elemMatch: {
            'colorDetails.color': color,
          },
        },
      },
      { $push: { 'product_colorAndSizeDetails.$[].images': imagesArray } },
      { upsert: true },
    ),
};

module.exports = productsRepository;
