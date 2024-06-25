const express = require('express');
const clientRouter = express.Router();
const orderController = require('../controllers/orderController');

clientRouter.post('/', orderController.createOrder);
clientRouter.get('/', orderController.getAllOrders);

module.exports = clientRouter;
