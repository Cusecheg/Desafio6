const express = require('express');
const router = express.Router();

const clientRoute = require('../clientRoute');
const productRoute = require('../productRoute');
const orderRoute = require('../orderRoute');



router.use('/client', clientRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);

module.exports = router