/* eslint-disable no-unused-vars */
const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
const userCtl = require('../controllers/userController');
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
router.post('/registration', userCtl.registration);


/**
 * login
 * @route POST /admin/adminLogin
 * @group Upload API - Endpoints related to admin Login.
 * @returns {object} 200 - On Successful Login
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', userCtl.Login);

/**
 * sendPasswordResetLink
 * @route GET  /admin/sendPasswordResetLink
 * @group Upload API - Endpoint to send Password ResetLink.
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.get('/sendPasswordResetLink', userCtl.sendPasswordResetLink);

/**
 * verifyPasswordResetLink
 * @route GET  /admin/verifyPasswordResetLink
 * @group Upload API - Endpoint to verify Password Reset Link.
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.get('/verifyPasswordResetLink', userCtl.verifyPasswordResetLink);

/**
 * resetPassword
 * @route POST  /admin/resetPassword
 * @group Upload API - Endpoint to reset Password
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.post('/resetPassword', userCtl.resetPassword);


/**
 * addFollower
 * @route POST  /user/addFollower
 * @group Upload API - Endpoint to add Follower
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.post('/addFollower', auth , userCtl.addFollower);


/**
 * addFollower
 * @route POST  /user/removeFollower
 * @group Upload API - Endpoint to remove Follower
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.post('/removeFollower', auth , userCtl.removeFollower);


/**
 * Get Users To Follow
 * @route GET  /users/getUsersToFollow
 * @group Upload API - Endpoint to get Users To Follow.
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.get('/getUsersToFollow', auth , userCtl.getUsersToFollow);


/**
 * Get Posts
 * @route GET  /users/getPosts
 * @group Upload API - Endpoint to get Posts.
 * @returns {object} 200 - On Success
 * @returns {Error}  default - Unexpected error
 */
router.get('/getPosts', auth , userCtl.getPosts);


module.exports = router;
