const { InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const tweetService = require('../services/tweetService');
const tweet_service = new tweetService();

const tweetCtlr = {
  createTweet: async function (req, res, next) {
    try {
      let { description , image  } = req.body;
      let user_Id = req.user.user._id;
      const response = await tweet_service.createTweet({description , user_Id , image});
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        next(new InternalServerError('something went wrong!'));
      }
    }
  },
  
};

module.exports = tweetCtlr;
