const express = require('express');

const router = express.Router();

const brandCltr = require('../controllers/brandController');

// Post route to add product to database

/**
 * add product details
 * @route POST /product/addProduct
 * @group add API - Endpoints related to add product.
 * @returns {object} 200 - Product Added
 * @returns {Error}  default - Unexpected error
 */
router.post('/addBrand', brandCltr.addBrand);

// Post route to edit product details
/**
 * edit product details
 * @route POST /product/updateProduct
 * @group edit API - Endpoints related to edit product.
 * @returns {object} 200 - Product Updated
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateBrand', brandCltr.updateBrand);

// Post route to edit product details

/**
 * delete product
 * @route POST /product/updateProduct
 * @group delete API - Endpoints related to delete product.
 * @returns {object} 200 - Product Deleted
 * @returns {Error}  default - Unexpected error
 */
router.post('/deleteBrand', brandCltr.deleteBrand);

// Get route to get all products

/**
 * delete product
 * @route Get /product/getProducts
 * @group get API - Endpoints related to get all products.
 * @returns {object} 200 - All Products Fetched
 * @returns {Error}  default - Unexpected error
 */
router.get('/getBrands', brandCltr.getBrands);

// /**
//  * Get Selected Product Info
//  * @route Post /product/getSelectedProductDetails
//  * @group get API - Endpoints related to selected product details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getFilteredBrands', brandCltr.getFilteredBrands);

module.exports = router;
