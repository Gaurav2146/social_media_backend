const express = require('express');

const router = express.Router();

const brandCltr = require('../controllers/brandController');

// Post route to add brand to database

/**
 * add brand details
 * @route POST /brand/addBrand
 * @group add API - Endpoints related to add brand.
 * @returns {object} 200 - Brand Added
 * @returns {Error}  default - Unexpected error
 */
router.post('/addBrand', brandCltr.addBrand);

// Post route to edit brand details
/**
 * edit brand details
 * @route POST /brand/updateBrand
 * @group edit API - Endpoints related to edit brand.
 * @returns {object} 200 - Brand Updated
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateBrand', brandCltr.updateBrand);

// Post route to delete brand details

/**
 * delete brand
 * @route POST /brand/deleteBrand
 * @group delete API - Endpoints related to delete brand.
 * @returns {object} 200 - Brand Deleted
 * @returns {Error}  default - Unexpected error
 */
router.post('/deleteBrand', brandCltr.deleteBrand);

// Get route to get all brands

/**
 * get brands
 * @route Get /brand/getBrands
 * @group get API - Endpoints related to get all brands.
 * @returns {object} 200 - All Brands Fetched
 * @returns {Error}  default - Unexpected error
 */
router.get('/getBrands', brandCltr.getBrands);

// Post route to get filtered brands

// /**
//  * Get Selected Brands
//  * @route Post /brand/getFilteredBrands
//  * @group get API - Endpoints related to filtered brand details.
//  * @returns {object} 200 - Brand Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getFilteredBrands', brandCltr.getFilteredBrands);

module.exports = router;
