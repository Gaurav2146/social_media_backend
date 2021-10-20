const express = require('express');

const router = express.Router();

const subscriptionCltr = require('../controllers/subscription.controller');

// Post route to add subscription  to database

/**
 * add subscription details
 * @route POST /subscription/addSubscriptionDetail
 * @group add API - Endpoints related to add subscription.
 * @returns {object} 200 - Subscription Added
 * @returns {Error}  default - Unexpected error
 */
router.post('/addSubscriptionDetail', subscriptionCltr.addSubscriptionDetail);

// GET route to fetch subscriptions from database

/**
 * add product tags details
 * @route GET /subscription/getAllSubscriptions
 * @group add API - Endpoints related to add product tags.
 * @returns {object} 200 - all subscription fetched
 * @returns {Error}  default - Unexpected error
 */
router.get('/getAllSubscriptions', subscriptionCltr.getAllSubscriptions);

module.exports = router;
