const mongoose = require('mongoose');

const productAddSchema = new mongoose.Schema({
  product_name: {
    type: String,
    trim: true,
  },
  product_brand: {
    type: mongoose.Schema.ObjectId,
    trim: true,
    ref: 'Brands',
  },
  product_collectionName: [
    {
      type: mongoose.Schema.ObjectId,
      trim: true,
      ref: 'Collections',
    },
  ],
  product_tags: [
    {
      type: mongoose.Schema.ObjectId,
      trim: true,
      ref: 'Tags',
    },
  ],
  product_weight: {
    type: Number,
  },
  product_weightUnit: {
    type: String,
    enum: ['grams', 'ounces', 'pounds'],
  },
  product_description: {
    type: String,
    trim: true,
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
    default: 'inactive',
  },
  product_stepperStatus: {
    type: Boolean,
    default: false,
  },
  product_withoutVariantDetails: {
    price: { type: Number },
    qty: { type: Number },
    remaining_qty: { type: Number },
    images: [
      {
        file: { type: String },
        key: { type: String },
        contentType: { type: String },
      },
    ],
  },
  product_stepperLastStepVisited: {
    type: Number,
    default: 1,
  },
  nft_image: {
    imageHash: { type: String },
    JSONHash: { type: String },
    fileType: { type: String },
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
          remaining_qty: { type: Number },
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
