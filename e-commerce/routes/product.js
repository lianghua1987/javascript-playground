const express = require('express');
const router = express.Router();
const repo = require('../repositories/product');
const template = require('../views/products/index');

router.get('/', async (req, res) => {
  const products = await repo.getAll();
  res.send(template({products}));
});

module.exports = router;