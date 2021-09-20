/* eslint-disable no-unused-vars */
const express = require('express');

const jwt = require('express-jwt');

const router = express.Router();

const adminCtl = require('../controllers/adminController');

const app = express();

const auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], userProperty: 'user' }), async (req, res, next) => {
  console.log(req.user, 'inside jwt');
  next();
});

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

/**
 * login
 * @route POST /adminLogin
 * @group Upload API - Endpoints related to admin Login.
 * @returns {object} 200 - On Successful Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/adminLogin', adminCtl.adminLogin);

router.get('/sendPasswordResetLink', adminCtl.sendPasswordResetLink);

module.exports = router;
