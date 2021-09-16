const express = require('express');

const router = express.Router();
const UserCtl = require('../controllers/userController');

// Post route to sign up admin into admin panel

/**
 * upload video to s3 bucket
 * @route POST /user/videoupload
 * @group Upload API - Endpoints related to upload transactions.
 * @returns {object} 200 - Upload Object
 * @returns {Error}  default - Unexpected error
 * @security Bearer_Token
 */
router.post('/registration', UserCtl.registration);

/**
 * login
 * @route POST /user/createbundle
 * @group Upload API - Endpoints related to upload transactions.
 * @returns {object} 200 - Upload Object
 * @returns {Error}  default - Unexpected error
 * @security Bearer_Token
 */
router.post('/login', UserCtl.login);

/**
 * get users from database
 * @route POST /user/createbundle
 * @group Upload API - Endpoints related to upload transactions.
 * @returns {array} 200 - User Array
 * @returns {Error}  default - Unexpected error
 * @security Bearer_Token
 */
router.get('/list', UserCtl.getUsers);

module.exports = router;
