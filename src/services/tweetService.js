/* eslint-disable no-async-promise-executor */
/* eslint-disable no-param-reassign */
const tweetRepository = require('../repositories/tweet.repository');

class tweetService {
  constructor() {
    this.tweetRepository = tweetRepository;
  }


  createTweet({description , user_Id , image}) {
    return new Promise(async (resolve, reject) => {
      try {
       let tweet = await this.tweetRepository.createTweet({description , user_Id , image});
       resolve(tweet);
      } catch (e) {
        reject(e);
      }
    });
  }

}
 
module.exports = tweetService;
