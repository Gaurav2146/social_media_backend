const mongoose = require('mongoose');

const subscriptionAddSchema = new mongoose.Schema({
  email: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const AddSubscription = mongoose.model('Subscriptions', subscriptionAddSchema);

module.exports = AddSubscription;
