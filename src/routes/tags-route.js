const express = require('express');

const router = express.Router();

const tagsCltr = require('../controllers/tagsController');

// Post route to add product to database

/**
 * add product details
 * @route POST /product/addProduct
 * @group add API - Endpoints related to add product.
 * @returns {object} 200 - Product Added
 * @returns {Error}  default - Unexpected error
 */
router.post('/addTag', tagsCltr.addTag);

// Post route to edit product details
/**
 * edit product details
 * @route POST /product/updateProduct
 * @group edit API - Endpoints related to edit product.
 * @returns {object} 200 - Product Updated
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateTag', tagsCltr.updateTag);

// Post route to edit product details

/**
 * delete product
 * @route POST /product/updateProduct
 * @group delete API - Endpoints related to delete product.
 * @returns {object} 200 - Product Deleted
 * @returns {Error}  default - Unexpected error
 */
router.post('/deleteTag', tagsCltr.deleteTag);

// Get route to get all products

/**
 * delete product
 * @route Get /product/getProducts
 * @group get API - Endpoints related to get all products.
 * @returns {object} 200 - All Products Fetched
 * @returns {Error}  default - Unexpected error
 */
router.get('/getTags', tagsCltr.getTags);

// /**
//  * Get Selected Product Info
//  * @route Post /product/getSelectedProductDetails
//  * @group get API - Endpoints related to selected product details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getFilteredTags', tagsCltr.getFilteredTags);

module.exports = router;
