const mongoose = require('mongoose');

const productAddSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_brand: {
    type: String,
  },
  product_tag: {
    type: String,
  },
  product_tokenType: {
    type: String,
  },
});

const AddProducts = mongoose.model('Products', productAddSchema);

module.exports = AddProducts;
