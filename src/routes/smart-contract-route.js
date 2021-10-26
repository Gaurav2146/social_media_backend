const express = require('express');
const jwt = require('express-jwt');

const router = express.Router();
const smartContractCtl = require('../controllers/smartContractController');

const app = express();

const auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }), async function (req, res, next) {
  console.log(req.user, 'inside jwt');
  next();
});

/**
 * get Address Balance from Blockchain
 * @route GET /smartContract/getBalance
 * @group Upload API - Endpoints to get Address Balance
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/getBalance', smartContractCtl.getBalance);


/**
 * get Address Balance from Blockchain
 * @route GET /smartContract/getBalance
 * @group Upload API - Endpoints to get Address Balance
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/getBalance', smartContractCtl.getBalance);


module.exports = router;
