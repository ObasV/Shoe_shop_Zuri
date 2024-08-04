const express = require('express');
const productController = require('../controllers/product_controller'); 
const verifyJWT = require('../middlewares/verifyJWT');


const productRouter = express.Router();

// Routes for product management (Admin functionalities)
productRouter.post('/', verifyJWT, productController.createProduct); // Create a new product
productRouter.get('/', verifyJWT, productController.getProducts); // Get all non-hidden products (with optional filters)
productRouter.get('/:id', verifyJWT, productController.getProductById); // Get a specific product by ID
productRouter.put('/:id', verifyJWT, productController.updateProduct); // Update an existing product
productRouter.put('/:id/hide', verifyJWT, productController.hideProduct); // Hide a product

// Routes for product browsing (Client functionalities)
productRouter.get('/products', verifyJWT, productController.getProducts); // Get all non-hidden products (with optional filters)
productRouter.get('/products/:id', verifyJWT, productController.getProductById); // Get a specific product by ID (if not hidden)

module.exports = productRouter;
