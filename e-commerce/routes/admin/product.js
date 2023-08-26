const express = require("express");
const multer = require('multer');
const {validationResult} = require('express-validator');
const productTemplate = require('../../views/admin/products/new');
const productEditTemplate = require('../../views/admin/products/edit');
const productsTemplate = require('../../views/admin/products/index');
const {requireTitle, requirePrice} = require('./validator');
const repo = require('../../repositories/product');
const {handleErrors, requireAuth} = require("./middleware");

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.get("/admin/products", requireAuth, async (req, res) => {
  const products = await repo.getAll();
  res.send(productsTemplate(products));
});

router.get("/admin/products/new", requireAuth, (req, res) => {
  res.send(productTemplate({}));
});

router.post("/admin/products/new", requireAuth, upload.single('file'), [requireTitle, requirePrice], handleErrors(productTemplate), async (req, res) => {
  const file = req.file.buffer.toString('base64');
  const {title, price} = req.body;
  await repo.create({title, price, file});
  res.redirect('/admin/products');
});

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
  const product = await repo.get(req.params.id);
  if (!product) return res.send("Product not found");
  res.send(productEditTemplate({product}));
});

router.post('/admin/products/:id/edit', requireAuth, upload.single('file'), [requireTitle, requirePrice], handleErrors(productEditTemplate, async (req) => {
  const product = await repo.get(req.params.id);
  return {product};
}), async (req, res) => {
  const updated = req.body;
  if (req.file) updated.file = req.file.buffer.toString('base64');
  try {
    await repo.update(req.params.id, updated);
  } catch (e) {
    return res.send(`Can't find product: ${req.params.id}`);
  }
  res.redirect('/admin/products');
});

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
  await repo.delete(req.params.id)
  res.redirect('/admin/products');
});
module.exports = router;