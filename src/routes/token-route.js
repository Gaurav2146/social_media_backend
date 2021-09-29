const express = require('express');
var jwt = require('express-jwt');
const router = express.Router();
const tokenCtl = require('../controllers/tokenController');
var app = express();

let auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] , userProperty: 'user'}),
  async function(req, res,next) {
    // console.log(req.user , 'inside jwt');
     next();
  });                                                                                      
  
/**
 * save token in database
 * @route GET /token/saveToken
 * @group API - Endpoints to save token
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
 router.post('/saveToken', auth , tokenCtl.saveToken);


 /**
 * get token from database
 * @route GET /token/getAllTokens
 * @group API - Endpoints to get All Tokens
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
  router.post('/getAllTokens', auth , tokenCtl.getAllTokens);

  router.post('/getTokenDetail',  tokenCtl.getTokenDetail);

  router.get('/getTokenById',  tokenCtl.getTokenById);

  

module.exports = router;
