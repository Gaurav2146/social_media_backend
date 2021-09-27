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

  createProductStepThree: (productID, color, imagesArray) =>
    Products.findByIdAndUpdate(
      {
        _id: productID,
        product_colorAndSizeDetails: {
          $elemMatch: {
            'colorDetails.color': color,
          },
        },
      },
      {
        $set: {
          'product_colorAndSizeDetails.$[outer].images': imagesArray,
        },
      },
      {
        arrayFilters: [{ 'outer.colorDetails.color': color }],
      },
      (err, result) => {
        if (err) {
          console.log(`Error updating service: ${err}`);
        } else {
          console.log(`${result} document(s) updated`);
        }
      },
    ),
};

module.exports = productsRepository;
