const express = require('express');
const router = express.Router();
const contractMetadataController = require('../controllers/contractMetadataController');

/**
 * get contract Metadata from Blockchain
 * @route GET /contract/my-metadata
 * @group Upload API - Endpoints to get contract Metadata
 * @returns {array of object} 200
 * @returns {Error}  default - Unexpected error
 */
router.get('/my-metadata', contractMetadataController.getContractMetadata);

module.exports = router;
