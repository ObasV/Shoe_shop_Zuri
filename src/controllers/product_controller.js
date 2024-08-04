const express = require('express');
const mongoose = require('mongoose'); 

const Product = require('../models/product_models');


// Function to create a new product
  async function createProduct(req, res) {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating product' });
    }
  }

  // Function to get all non-hidden products or filtered products
  async function getProducts(req, res) {
    const { filterBy, searchTerm } = req.query; // Optional query parameters for filtering/searching

    let query = { hidden: false }; // Exclude hidden products by default

    if (filterBy && searchTerm) {
      // Build query based on filter and search criteria (replace with your logic)
      query = { ...query, [filterBy]: { $regex: searchTerm, $options: 'i' } };
    }

    try {
      const products = await Product.find(query);
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving products' });
    }
  }

  // Function to get a specific product by ID
  async function getProductById(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving product' });
    }
  }

  // Function to update an existing product
  async function updateProduct(req, res) {
    const { id } = req.params;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true }); // Replace with your update logic
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating product' });
    }
  }

  // Function to hide a product
  async function hideProduct(req, res) {
    const { id } = req.params;

    try {
      const hiddenProduct = await Product.findByIdAndUpdate(id, { hidden: true }, { new: true });
      if (!hiddenProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(hiddenProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error hiding product' });
    }
  }
;

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    hideProduct

};
