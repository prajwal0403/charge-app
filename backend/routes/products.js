const express = require('express');
const router = express.Router();
const { Product, User } = require('../models');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// @route   GET /api/products
// @desc    Get all products, optional filter by admin username
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { admin } = req.query;
    let where = {};
    if (admin) {
      // find user by email or username
      const user = await User.findOne({ where: { email: admin } });
      if (user) {
        where.createdBy = user.id;
      } else {
        return res.status(404).json({ msg: 'Admin user not found' });
      }
    }
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add this after your existing `/` route
router.get('/all', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Admin
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const product = await Product.create({ name, description, price, createdBy: req.user.id });
      res.status(201).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Admin
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ msg: 'Product not found' });
      if (product.createdBy !== req.user.id) {
        return res.status(403).json({ msg: 'Not allowed to modify this product' });
      }
      const { name, description, price } = req.body;
      await product.update({ name, description, price });
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Admin
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ msg: 'Product not found' });
      if (product.createdBy !== req.user.id) {
        return res.status(403).json({ msg: 'Not allowed to delete this product' });
      }
      await product.destroy();
      res.json({ msg: 'Product removed' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
