const express = require('express');
const {check, body, validationResult} = require('express-validator');
const userRepo = require("../../repositories/user");

const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExists,
  requireValidPassword
} = require("./validator");
const {handleErrors} = require("./middleware");
const productTemplate = require("../../views/admin/products/new");
const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({req}));
});

router.post("/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation], handleErrors(signupTemplate),
  async (req, res) => {
    const {email, password, passwordConfirmation} = req.body;
    const user = await userRepo.create({email, password});
    req.session.userId = user.id;
    res.redirect('/admin/products');
  });

router.get("/signout", (req, res) => {
  req.session = null;
  return res.send("You are logged out");
});

router.get('/signin', (req, res) => {
  return res.send(signinTemplate({}))
});

router.post("/signin",
  [requireEmailExists, requireValidPassword],handleErrors(signinTemplate),
  async (req, res) => {
    const {email, password} = req.body;
    const user = await userRepo.getOneBy({email});
    req.session.userId = user.id;
    res.redirect('/admin/products');
  });

module.exports = router;