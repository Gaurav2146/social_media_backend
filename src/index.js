const express = require('express');
const { admin, product , user} = require('./routes');

const router = express.Router();

router.use('/admin', admin);
router.use('/product', product);

router.use('/user', user);

module.exports = router;
