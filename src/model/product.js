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
  product_tags: [
    {
      type: String,
    },
  ],
  product_weight: {
    type: String,
  },
  product_weightUnit: {
    type: String,
  },
  product_sizeDetails: [
    {
      color: {
        type: String,
      },
      qty: {
        type: Number,
      },
      image: [
        {
          type: String,
        },
      ],
    },
  ],
  product_tokenDetails: [
    {
      token_type: {
        type: String,
      },
      token_name: {
        type: String,
      },
      contact_address: {
        type: String,
      },
      token_id: {
        type: String,
      },
    },
  ],
});

const AddProducts = mongoose.model('Products', productAddSchema);

module.exports = AddProducts;
