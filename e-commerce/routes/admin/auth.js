const express = require('express');
const userRepo = require("../../repository/user");
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({req}));
});

router.post("/signup", async (req, res) => {
  const {email, password, passwordConfirmation} = req.body;
  const existingUser = await userRepo.getOneBy({email});
  if (existingUser) {
    res.send("Email already in use!");
  }
  if (password !== passwordConfirmation) {
    res.send("Passwords do not match!");
  }

  const user = await userRepo.create({email, password});
  req.session.userId = user.id;
  res.send("Account created!");
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get('/signin', (req, res) => {
  res.send(signinTemplate())
});

router.post("/signin", async (req, res) => {
  const {email, password} = req.body;
  const user = await userRepo.getOneBy({email});
  const isPasswordValid = await userRepo.validatePassword(user.password, password);
  if (!isPasswordValid) {
    res.send("Invalid user or password");
  } else {
    req.session.userId = user.id;
    res.send("You are signed in");
  }
});

module.exports = router;