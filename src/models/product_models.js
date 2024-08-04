const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  hidden: {
    type: Boolean,
    required: true,
    default: false,
  },
  variations: [
    {
      size: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model('Product', productSchema);
