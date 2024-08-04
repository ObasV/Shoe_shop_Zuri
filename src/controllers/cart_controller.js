const Cart = require('../models/cart_models');

const CartController = {
  addToCart(req, res) {
    const { productId, variation, quantity } = req.body;

    try {
      Cart.addItem(productId, variation, quantity);
      res.json(Cart.getCartItems());
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding to cart' });
    }
  },

  getCart(req, res) {
    try {
      res.json(Cart.getCartItems());
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving cart' });
    }
  },

  clearCart(req, res) {
    try {
      Cart.clearCart();
      res.json({ message: 'Cart cleared successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error clearing cart' });
    }
  },
};

module.exports = CartController;
