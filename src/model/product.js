const mongoose = require('mongoose');

const productAddSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_brand: {
    type: mongoose.Schema.ObjectId,
    trim: true,
    ref: 'Brands',
  },
  product_collectionName: {
    type: String,
  },
  product_tags: [{ type: String }],
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
  product_stepper: {
    type: String,
    default: 'incomplete',
    enum: ['incomplete', 'completed'],
  },
  product_stepperStatus: {
    type: Boolean,
    default: false,
  },
  product_stepperLastStepVisited: {
    type: Number,
    default: 1,
  },
  nft_image: {
    file: { type: String },
    key: { type: String },
    contentType: { type: String },
  },
  product_colorAndSizeDetails: [
    {
      colorDetails: {
        color: { type: String },
        colorCode: { type: String },
      },
      images: [
        {
          file: { type: String },
          key: { type: String },
          contentType: { type: String },
        },
      ],
      sizeInfo: [
        {
          qty: { type: Number },
          price: { type: Number },
          size: { type: String },
        },
      ],
    },
  ],
  product_tokenDetails: [
    {
      token_id: {
        type: mongoose.Schema.ObjectId,
        trim: true,
        ref: 'Token',
      },
      min_amt: {
        type: Number,
      },
      past_trx: {
        type: Boolean,
      },
    },
  ],
});

const AddProducts = mongoose.model('Products', productAddSchema);

module.exports = AddProducts;
