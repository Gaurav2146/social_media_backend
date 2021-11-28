const express = require('express');

const { admin, tweet} = require('./routes');

const router = express.Router();

router.use('/user', admin);
router.use('/tweet', tweet);

module.exports = router;
