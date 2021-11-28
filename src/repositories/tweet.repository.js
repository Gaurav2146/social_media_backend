
const mongoose = require('mongoose');
const Tweet = require('../model/tweet');

const tweetRepository = {
    createTweet: (tweetObj) => {
        return new Promise(async (resolve, reject) => {
          try {
            let tweet = await Tweet.create(tweetObj);
            resolve(tweet);
          } catch (error) {
            console.log(error);
            reject(error);
          }
        });
      },
};

module.exports = tweetRepository;