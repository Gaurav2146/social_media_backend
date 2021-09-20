const express = require('express');
const { admin, product } = require('./routes');

const router = express.Router();

router.use('/admin', admin);
router.use('/product', product);

module.exports = router;
