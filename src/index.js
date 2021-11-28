const express = require('express');

const { user, tweet} = require('./routes');

const router = express.Router();

router.use('/user', user);
router.use('/tweet', tweet);

module.exports = router;
