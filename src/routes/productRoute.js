const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController')

productRouter.post('/', productController.createProduct);
productRouter.get('/all', productController.getAllProducts);
productRouter.get('/:id', productController.getProduct);
productRouter.put('/:id', productController.sofDelete);
productRouter.put('/', productController.updateProduct);

module.exports = productRouter;