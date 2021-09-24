const express = require('express');
var jwt = require('express-jwt');
const router = express.Router();
const userCtl = require('../controllers/userController');
var app = express();

let auth = app.use(jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] , userProperty: 'user'}),
  async function(req, res,next) {
    console.log(req.user , 'inside jwt');
     next();
  });
  
/**
 * get users from database
 * @route GET /user/getProducts
 * @group API - Endpoints to get products
 * @returns {array of object} 200  
 * @returns {Error}  default - Unexpected error
 */
 router.get('/getProducts', userCtl.getProducts);


module.exports = router;
