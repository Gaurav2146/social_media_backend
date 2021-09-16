const express = require('express');
const { user } = require('./routes');

const router = express.Router();

router.use('/user', user);

module.exports = router;
