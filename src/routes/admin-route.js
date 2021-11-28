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

/**
 * admin registration
 * @route POST /admin/registration
 * @group Upload API - Endpoints for registration
 * @returns {object} 200 - on successful registration
 * @returns {Error}  default - Unexpected error
 */
router.post('/registration', adminCtl.registration);


/**
 * login
 * @route POST /admin/adminLogin
 * @group Upload API - Endpoints related to admin Login.
 * @returns {object} 200 - On Successful Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', adminCtl.adminLogin);

/**
 * sendPasswordResetLink
 * @route GET  /admin/sendPasswordResetLink
 * @group Upload API - Endpoint to send Password ResetLink.
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.get('/sendPasswordResetLink', adminCtl.sendPasswordResetLink);

/**
 * verifyPasswordResetLink
 * @route GET  /admin/verifyPasswordResetLink
 * @group Upload API - Endpoint to verify Password Reset Link.
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.get('/verifyPasswordResetLink', adminCtl.verifyPasswordResetLink);

/**
 * resetPassword
 * @route POST  /admin/resetPassword
 * @group Upload API - Endpoint to reset Password
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.post('/resetPassword', adminCtl.resetPassword);


/**
 * addFollower
 * @route POST  /user/addFollower
 * @group Upload API - Endpoint to add Follower
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.post('/addFollower', auth , adminCtl.addFollower);

module.exports = router;
