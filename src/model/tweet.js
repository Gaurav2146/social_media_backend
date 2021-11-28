/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
   description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  user_Id:{
    type: mongoose.Types.ObjectId,
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
