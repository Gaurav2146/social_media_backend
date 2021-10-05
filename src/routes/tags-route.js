const express = require('express');

const router = express.Router();

const tagsCltr = require('../controllers/tagsController');

// Post route to add tags to database

/**
 * add product tags details
 * @route POST /tags/addTag
 * @group add API - Endpoints related to add product tags.
 * @returns {object} 200 - Product Tag Added
 * @returns {Error}  default - Unexpected error
 */
router.post('/addTag', tagsCltr.addTag);

// Post route to edit product tags details
/**
 * edit product tags details
 * @route POST /tags/updateTag
 * @group edit API - Endpoints related to edit product tag.
 * @returns {object} 200 - Product Tag Updated
 * @returns {Error}  default - Unexpected error
 */
router.post('/updateTag', tagsCltr.updateTag);

// Post route to edit product tag details

/**
 * delete product tag
 * @route POST /tags/deleteTag
 * @group delete API - Endpoints related to delete product tag.
 * @returns {object} 200 - Product Tag Deleted
 * @returns {Error}  default - Unexpected error
 */
router.post('/deleteTag', tagsCltr.deleteTag);

// Get route to get all products tags

/**
 * get tags
 * @route Get /tags/getTags
 * @group get API - Endpoints related to get all products tags.
 * @returns {object} 200 - All Products tags Fetched
 * @returns {Error}  default - Unexpected error
 */
router.get('/getTags', tagsCltr.getTags);

// Post route to get all filtered products tags

// /**
//  * Get Filtered Product Tags
//  * @route Post /tags/getFilteredTags
//  * @group get API - Endpoints related to filtered product tags.
//  * @returns {object} 200 - Product Tags Information Fetched
//  * @returns {Error}  default - Unexpected error
//  */
router.post('/getFilteredTags', tagsCltr.getFilteredTags);

module.exports = router;
