const express = require('express');
const cartController = require('../controllers/cart_controller');
const verifyJWT = require('../middlewares/verifyJWT');


const cartRouter = express.Router();

cartRouter.post('/add', verifyJWT, cartController.addToCart);
cartRouter.get('/', verifyJWT, cartController.getCart);
cartRouter.delete('/', verifyJWT, cartController.clearCart);

module.exports = cartRouter;
