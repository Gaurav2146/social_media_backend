const mongoose = require('mongoose');

const collectionAddSchema = new mongoose.Schema({
  collection_name: [{ type: String }],
  collection_createdAt: {
    type: Date,
    default: Date.now,
  },
  collection_updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const AddCollections = mongoose.model('Collections', collectionAddSchema);

module.exports = AddCollections;
