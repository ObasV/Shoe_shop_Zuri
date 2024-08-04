const items = []; // Array to store cart items

const Cart = {
  addItem(productId, variation, quantity) {
    const existingItem = items.find(
      (item) => item.productId === productId && JSON.stringify(item.variation) === JSON.stringify(variation)
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ productId, variation, quantity });
    }
  },

  getCartItems() {
    return items;
  },

  clearCart() {
    items.length = 0; // Clear cart items
  },
};

module.exports = Cart;
