const mongoose = require('mongoose');

const brandAddSchema = new mongoose.Schema({
  brand_name: { type: String },
  brand_createdAt: {
    type: Date,
    default: Date.now,
  },
  brand_updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const AddBrands = mongoose.model('Brands', brandAddSchema);

module.exports = AddBrands;
