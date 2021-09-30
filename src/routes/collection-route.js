const express = require('express');

const router = express.Router();

const collectionCltr = require('../controllers/collectionController');

// Post route to add product to database

/**
 * add product details
 * @route POST /product/addProduct
 * @group add API - Endpoints related to add product.
 * @returns {object} 200 - Product Added
 * @returns {Error}  default - Unexpected error
 */
router.post('/addCollection', collectionCltr.addCollection);

// Post route to edit product details
/**
 * edit product details
 * @route POST /product/updateProduct
 * @group edit API - Endpoints related to edit product.
 * @returns {object} 200 - Product Updated
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateCollection', collectionCltr.updateCollection);

// Post route to edit product details

/**
 * delete product
 * @route POST /product/updateProduct
 * @group delete API - Endpoints related to delete product.
 * @returns {object} 200 - Product Deleted
 * @returns {Error}  default - Unexpected error
 */
router.post('/deleteCollection', collectionCltr.deleteCollection);

// Get route to get all products

/**
 * delete product
 * @route Get /product/getProducts
 * @group get API - Endpoints related to get all products.
 * @returns {object} 200 - All Products Fetched
 * @returns {Error}  default - Unexpected error
 */
router.get('/getCollections', collectionCltr.getCollections);

// /**
//  * Get Selected Product Info
//  * @route Post /product/getSelectedProductDetails
//  * @group get API - Endpoints related to selected product details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getFilteredCollections', collectionCltr.getFilteredCollections);

module.exports = router;
