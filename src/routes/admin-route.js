const express = require('express');

const router = express.Router();
const adminCtl = require('../controllers/adminController');

// Post route to sign up admin into admin panel

/**
 * upload video to s3 bucket
 * @route POST /user/videoupload
 * @group Upload API - Endpoints related to upload transactions.
 * @returns {object} 200 - Upload Object
 * @returns {Error}  default - Unexpected error
 */
router.post('/registration', adminCtl.registration);

/**
 * login
 * @route POST /user/createbundle
 * @group Upload API - Endpoints related to upload transactions.
 * @returns {object} 200 - Upload Object
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', adminCtl.login);

/**
 * get users from database
 * @route POST /user/createbundle
 * @group Upload API - Endpoints related to upload transactions.
 * @returns {array} 200 - User Array
 * @returns {Error}  default - Unexpected error
 * @security Bearer_Token
 */
router.get('/list', adminCtl.getUsers);


/**
 * get users from database
 * @route GET /admin/isAdminAvailable
 * @group Upload API - Endpoints related to check initial setuo done or not
 * @returns {boolean} 200 - true or false
 * @returns {Error}  default - Unexpected error
 */
 router.get('/isAdminAvailable', adminCtl.isAdminAvailable);


module.exports = router;
