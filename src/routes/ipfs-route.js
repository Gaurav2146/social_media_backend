const express = require('express');
const router = express.Router();
const ipfsController = require('../controllers/ipfsController');
var app = express();


/**
 * get users from database
 * @route GET /user/getProducts
 * @group Upload API - Endpoints to get products
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/saveDataToIPFS', ipfsController.saveDataToIPFS);


module.exports = router;
