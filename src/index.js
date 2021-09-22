const express = require('express');
const { admin, product , user , smartContract} = require('./routes');
const router = express.Router();

router.use('/admin', admin);
router.use('/product', product);
router.use('/user', user);
router.use('./smartContract' , smartContract);

module.exports = router;
