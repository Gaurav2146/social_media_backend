const express = require('express');

const router = express.Router();

const collectionCltr = require('../controllers/collectionController');

// Post route to add product collection to database

/**
 * add product collection details
 * @route POST /collection/addCollection
 * @group add API - Endpoints related to add collection product.
 * @returns {object} 200 - Product Collection Added
 * @returns {Error}  default - Unexpected error
 */
router.post('/addCollection', collectionCltr.addCollection);

// Post route to edit product collection details
/**
 * edit product collection details
 * @route POST /collection/updateCollection
 * @group edit API - Endpoints related to edit product collection.
 * @returns {object} 200 - Product Collection Updated
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateCollection', collectionCltr.updateCollection);

// Post route to delete product collection details

/**
 * delete product
 * @route POST /collection/updateCollection
 * @group delete API - Endpoints related to delete product collection.
 * @returns {object} 200 - Product Collection Deleted
 * @returns {Error}  default - Unexpected error
 */
router.post('/deleteCollection', collectionCltr.deleteCollection);

// Get route to get all products collections

/**
 * get all product collections
 * @route Get /collection/getCollections
 * @group get API - Endpoints related to get all products collections.
 * @returns {object} 200 - All Products Collections Fetched
 * @returns {Error}  default - Unexpected error
 */
router.get('/getCollections', collectionCltr.getCollections);

// Post route to get all filtered products collections

// /**
//  * Get Filtered Product Collections
//  * @route Post /collection/getFilteredCollections
//  * @group get API - Endpoints related to filtered product collection details.
//  * @returns {object} 200 - Product Filtered Collection Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getFilteredCollections', collectionCltr.getFilteredCollections);

module.exports = router;
