const mongoose = require('mongoose');

const productAddSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_brand: {
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
    enum: ['grams', 'ounces', 'pounds'],
  },
  product_description: {
    type: String,
  },
  product_createdAt: {
    type: Date,
    default: Date.now,
  },
  product_updatedAt: {
    type: Date,
    default: Date.now,
  },
  product_status: {
    type: String,
    enum: ['active', 'inactive'],
  },
  product_stepperStatus: {
    type: Boolean,
    default: false,
  },
  product_stepperLastStepVisited: {
    type: Number,
    default: 1,
  },
  product_colorAndSizeDetails: [
    {
      colorDetails: {
        color: { type: String },
        colorCode: { type: String },
      },
      sizeInfo: [
        {
          qty: { type: Number },
          price: { type: Number },
          images: [
            {
              type: String,
            },
          ],
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
