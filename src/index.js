const express = require('express');
const { admin , user } = require('./routes');

const router = express.Router();

router.use('/admin', admin);

router.use('/user', user);

module.exports = router;
