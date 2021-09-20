const express = require('express');

const router = express.Router();

const productCltr = require('../controllers/productsController');

// Post route to add product to database

/**
 * add product details
 * @route POST /product/addProduct
 * @group add API - Endpoints related to add product.
 * @returns {object} 200 - Product Added
 * @returns {Error}  default - Unexpected error
 */
router.post('/addProduct', productCltr.addProduct);

// Post route to edit product details

/**
 * edit product details
 * @route POST /product/updateProduct
 * @group edit API - Endpoints related to edit product.
 * @returns {object} 200 - Product Updated
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateProduct', productCltr.updateProduct);

// Post route to edit product details

/**
 * delete product
 * @route POST /product/updateProduct
 * @group delete API - Endpoints related to delete product.
 * @returns {object} 200 - Product Deleted
 * @returns {Error}  default - Unexpected error
 */
router.post('/deleteProduct', productCltr.deleteProduct);

// Get route to get all products

/**
 * delete product
 * @route Get /product/getProducts
 * @group get API - Endpoints related to get all products.
 * @returns {object} 200 - All Products Fetched
 * @returns {Error}  default - Unexpected error
 */
router.get('/getProducts', productCltr.getProducts);

// Get route to get selected product details

// /**
//  * get product Information
//  * @route Get /product/getSelectedProductInformation
//  * @group get API - Endpoints related to get selected product details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
// router.get('/getSelectedProductInformation', productCltr.getSelectedProductInformation);

module.exports = router;
