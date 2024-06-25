const express = require('express');
const clientRouter = express.Router();
const clientController = require('../controllers/clientController');

clientRouter.post('/', clientController.createClient)

module.exports = clientRouter;

