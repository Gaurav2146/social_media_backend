const express = require('express');

const { admin, product, user, smartContract, token, brand, tags, collections, shipping, contract, ipfs, order } = require('./routes');

const router = express.Router();

router.use('/admin', admin);
router.use('/product', product);
router.use('/brand', brand);
router.use('/tags', tags);
router.use('/collection', collections);
router.use('/user', user);
router.use('/smartContract', smartContract);
router.use('/token', token);
router.use('/shipping', shipping);
router.use('/contract', contract);
router.use('/ipfs', ipfs);
router.use('/order', order);

module.exports = router;
