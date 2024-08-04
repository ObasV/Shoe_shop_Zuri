const Product = require('../models/product_models'); 
const Inventory = require('../models/inventory_models');


  async function getStockLevels(req, res) {
    try {
      const products = await Product.find({}).populate('variations'); // Get all products with variations
      const stockLevels = products.map((product) => {
        return product.variations.map((variation) => ({
          productId: product._id,
          size: variation.size,
          color: variation.color,
          stock: variation.stock,
        }));
      }).flat(); // Flatten nested array into a single list
      res.json(stockLevels);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving stock levels' });
    }
  }

  async function updateStock(req, res) {
    const { productId, variation: { size, color }, quantity } = req.body;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const existingVariation = product.variations.find(
        (v) => v.size === size && v.color === color
      );

      if (existingVariation) {
        existingVariation.stock += quantity; // Update stock for existing variation
      } else {
        product.variations.push({ size, color, stock: quantity }); // Create new variation
      }

      await product.save(); // Save updated product with variations

      // If using Inventory model, create an inventory record
      if (Inventory) {
        await new Inventory({ productId, variation: { size, color }, quantity }).save();
      }

      res.json({ message: 'Stock updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating stock' });
    }
  }

module.exports = {
    getStockLevels,
    updateStock
};
