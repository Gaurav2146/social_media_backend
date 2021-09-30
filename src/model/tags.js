const mongoose = require('mongoose');

const tagAddSchema = new mongoose.Schema({
  tag_name: { type: String },
  tag_createdAt: {
    type: Date,
    default: Date.now,
  },
  tag_updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const AddTags = mongoose.model('Tags', tagAddSchema);

module.exports = AddTags;
