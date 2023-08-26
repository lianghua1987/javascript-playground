const {check} = require('express-validator');
const userRepo = require("../../repositories/user");

module.exports = {
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (email) => {
      const existingUser = await userRepo.getOneBy({email});
      if (existingUser)  throw new Error("Email already in use");
      else return true;
    }),
  requirePassword: check('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage("Must between 4 and 20 characters"),
  requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage("Must between 4 and 20 characters")
    .custom((passwordConfirmation, {req}) => {
      if (req.body.password !== passwordConfirmation) throw new Error("Passwords do not match");
      else return true;
    }),
  requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (email) => {
      const user = await userRepo.getOneBy({email});
      if (!user) throw new Error("Email not found");
      else return true;
    }),
  requireValidPassword: check('password')
    .trim()
    .custom(async (password, {req}) => {
      const user = await userRepo.getOneBy({email: req.body.email});
      if (!user) throw new Error("Email not found");
      const isPasswordValid = await userRepo.validatePassword(user.password, password);
      if (!isPasswordValid) throw new Error("Invalid password");
      else return true;
    }),
  requireTitle: check('title')
    .trim()
    .isLength({min: 5, max: 40})
    .withMessage("Must between 5 and 40 characters"),
  requirePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({min: 1})
    .withMessage("Must greater than $1.00")
}