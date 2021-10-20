const express = require('express');
var jwt = require('express-jwt');
const router = express.Router();
const tokenCtl = require('../controllers/tokenController');
var app = express();

let auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }), async function (req, res, next) {
  // console.log(req.user , 'inside jwt');
  next();
});

/**
 * save token in database
 * @route POST /token/saveToken
 * @group API - Endpoints to save token
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/saveToken', auth, tokenCtl.saveToken);

/**
 * editToken token in database
 * @route POST /token/editToken
 * @group API - Endpoints to edit Token
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/editToken', auth, tokenCtl.editToken);

/**
 * get all tokens from database
 * @route POST /token/getAllTokens
 * @group API - Endpoints to get All Tokens
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/getAllTokens', auth, tokenCtl.getAllTokens);

/**
 * get token detail from database
 * @route POST /token/getTokenDetail
 * @group API - Endpoints to get All Tokens Detail
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/getTokenDetail', tokenCtl.getTokenDetail);

/**
 * get token detail from database
 * @route POST /token/getFilteredTokens
 * @group API - Endpoints to get All Tokens Detail
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/getFilteredTokens', tokenCtl.getFilteredTokens);

/**
 * get token detail from database
 * @route POST /token/getFilteredTokens
 * @group API - Endpoints to get All Tokens Detail
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/getFilteredTokensForAdmin', tokenCtl.getFilteredTokensForAdmin);

/**
 * get Token By Id from database
 * @route GET /token/getTokenById
 * @group API - Endpoints to get Token By Id
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/getTokenById', tokenCtl.getTokenById);

/**
 * delete Token from database
 * @route GET /token/deleteToken
 * @group API - Endpoints to delete Token By Id
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/deleteToken', tokenCtl.deleteToken);

/**
 * delete Token from database
 * @route GET /token/deleteToken
 * @group API - Endpoints to delete Token By Id
 * @returns {confirmation message} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/getAllTokensForProducts', tokenCtl.getAllTokensForProducts);

module.exports = router;
