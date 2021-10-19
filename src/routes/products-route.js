const jwt = require('express-jwt');

const express = require('express');

const router = express.Router();

const productCltr = require('../controllers/productsController');

const uploadImages = require('../route_middleware/uploadImages');

const auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }), async function (req, res, next) {
  console.log(req.user, 'inside jwt');
  next();
});
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

// Post route to get Create product Step 1

// /**
//  * Save product Information
//  * @route Post /product/createProductStepOne
//  * @group get API - Endpoints related to addproduct details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/addProductStepOne', productCltr.createProductStepOne);

// Post route to get Create product Step 2

// /**
//  * Save product Information
//  * @route Post /product/createProductStepTwo
//  * @group get API - Endpoints related to addproduct details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/addProductStepTwo', productCltr.createProductStepTwo);

// /**
//  * Save product Information
//  * @route Post /product/createProductStepThree
//  * @group get API - Endpoints related to addproduct details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/addProductStepThree', uploadImages.fileUploader, productCltr.createProductStepThree);

// /**
//  * Save product Information
//  * @route Post /product/createProductStepThree
//  * @group get API - Endpoints related to addproduct details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/addNFTImage', uploadImages.nftFileUploader, productCltr.addNFTImage);

// /**
//  * Get Filtered Products
//  * @route Post /product/getFilteredProducts
//  * @group get API - Endpoints related to filtered product details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getFilteredProducts', productCltr.getFilteredProducts);

// /**
//  * Get Selected Product Info
//  * @route Post /product/getSelectedProductDetails
//  * @group get API - Endpoints related to selected product details.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getSelectedProductDetails', productCltr.getSelectedProductInfo);

// /**
//  * Get Products For Admin
//  * @route Post /product/getProductsForAdmin
//  * @group get API - Endpoints related to all products.
//  * @returns {object} 200 - Product Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getProductsForAdmin', productCltr.getProductsForAdmin);

/**
 * Update Images
 * @route Post /product/getProductsForAdmin
 * @group get API - Endpoints related to all products.
 * @returns {object} 200 - Product Information Fetched
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateImagesForVariants', uploadImages.fileUploader, productCltr.updateImagesForVariants);

/**
 * Update NFt Image
 * @route Post /product/updateNFTImage
 * @group get API - Endpoints related to all products.
 * @returns {object} 200 - Product Information Fetched
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateNFTImage', uploadImages.nftFileUploader, productCltr.updateNFTImage);

/**
 * update Product Quantity
 * @route Post /product/updateProductQuantity
 * @group get API - Endpoints related to update Product Quantity
 * @returns {object} 200 - Product Information updated
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateProductQuantity', productCltr.updateProductQuantity);
module.exports = router;
