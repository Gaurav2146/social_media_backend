const Products = require('../model/product');

const productsRepository = {
  saveProduct: (productObject) => Products.create(productObject),

  getProducts: () => Products.find(),

  getProductDetails: (productID) => Products.find({ _id: productID }),

  editProductDetails: (productID, productObject) => Products.findByIdAndUpdate({ _id: productID }, productObject, { new: true }),

  deleteProduct: (productID) => Products.findByIdAndDelete({ _id: productID }),

  createProductStepOne: (productObject) => Products.create(productObject),

  createProductStepTwo: (productID, productObject) => Products.findByIdAndUpdate({ _id: productID }, { $set: productObject }, { new: true }),

  createProductStepThree: (productID, productObject) => Products.findByIdAndUpdate({ _id: productID }, productObject, { new: true }),
};

module.exports = productsRepository;
