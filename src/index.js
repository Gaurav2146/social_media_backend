const express = require('express');
const { admin, product , user , smartContract , token} = require('./routes');
const router = express.Router();

router.use('/admin', admin);
router.use('/product', product);
router.use('/user', user);
router.use('/smartContract' , smartContract);
router.use('/token' , token);

module.exports = router;
