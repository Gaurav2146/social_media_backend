const express = require('express');
var jwt = require('express-jwt');
const router = express.Router();
const contractMetadataController = require('../controllers/contractMetadataController');
var app = express();



let auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }),
    async function (req, res, next) {
        console.log(req.user, 'inside jwt');
        next();
    });

/**
 * get contract Metadata from Blockchain
 * @route GET /contract/my-metadata
 * @group Upload API - Endpoints to get contract Metadata
 * @returns {array of object} 200  
 * @returns {Error}  default - Unexpected error
 */
router.get('/my-metadata', contractMetadataController.getContractMetadata);


module.exports = router;