const express = require('express');
const { admin } = require('./routes');

const router = express.Router();

router.use('/admin', admin);

module.exports = router;
