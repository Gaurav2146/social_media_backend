const jwt = require('express-jwt');
const express = require('express');
const router = express.Router();
const tweetCtlr = require('../controllers/tweetController');
const app = express();

const auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }),
    async function (req, res, next) {
  console.log(req.user, 'inside jwt');
  next();
});


// /**
//  * create Tweet
//  * @route Post /tweet/createTweet
//  * @group get API - Endpoints related to create Tweet
//  * @returns {object} 200 - Tweet Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/createTweet', auth , tweetCtlr.createTweet);


module.exports = router;
