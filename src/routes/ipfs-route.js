const express = require('express');

const router = express.Router();

const ipfsController = require('../controllers/ipfsController');

const ipfsNFTImages = require('../route_middleware/ipfs');

var app = express();

/**
 * get users from database
 * @route GET /user/getProducts
 * @group Upload API - Endpoints to get products
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/saveDataToIPFS', ipfsController.saveDataToIPFS);

/**
 * get users from database
 * @route GET /user/getProducts
 * @group Upload API - Endpoints to get products
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.post('/saveDetailsToIPFS', ipfsNFTImages.pictureUpload, ipfsController.saveDetailsToIPFS);

module.exports = router;
