const express = require('express');
const repo = require('../repositories/cart');
const productRepo = require('../repositories/product');
const cartTemplate = require('../views/carts/show');

const router = express.Router();

router.post("/cart/products/", async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await repo.create({items: []});
    req.session.cartId = cart.id;
  } else {
    cart = await repo.get(req.session.cartId);
  }

  const item = cart.items.find(i => i.id === req.body.pid);
  if (item) {
    item.quantity++;
  } else {
    cart.items.push({id: req.body.pid, quantity: 1})
  }

  await repo.update(cart.id, {items: cart.items});
  res.redirect('/cart');
});

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await repo.get(req.session.cartId);
  for (let item of cart.items) {
    const product = await productRepo.get(item.id);
    item.product = product;
  }

  res.send(cartTemplate({items: cart.items}));
});

router.post("/cart/products/delete", async (req, res) => {
  const {pid} = req.body;
  const cart = await repo.get(req.session.cartId);
  const items = cart.items.filter(i => i.id !== pid);
  await repo.update(req.session.cartId, {items});
  res.redirect("/cart");
});

module.exports = router;