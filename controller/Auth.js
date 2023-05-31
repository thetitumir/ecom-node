var User = require("../models/UserModel");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
exports.indexController = (req, res, next) => {
  const user = req.session.user;
  res.render('frontend/home', { user: user });
}
exports.loginController = (req, res) => {
  res.render('frontend/login', { errors: "" });
}
exports.registerController = (req, res) => {
  res.render('frontend/register', { errors: "" });
}

const RegvalidationRules = [
  body("name").trim().notEmpty().withMessage("Please enter your name"),
  body("email").trim().isEmail().withMessage("Please enter your email"),
  body("password").trim().notEmpty().withMessage("Please enter your password"),
  // body("cpassword").equals(body("password")).withMessage("confirm password does not match with your password"),
];
exports.newRegisterController = async (req, res) => {
  await Promise.all(RegvalidationRules.map(rule => rule.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.render("frontend/register", { errors: errors.errors });
  } else {
    const password = bcrypt.hashSync(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: password,
      status: "active"
    }).then(user => {
      req.session.user = user;
      res.redirect("/")
    }).catch((err) => res.json(err));
  }

}

exports.logoutController = async (req, res) => {
  req.session.destroy(e => {
    res.redirect("/login");
  });
}

exports.productDetailController = async (req, res) => {
  res.render("frontend/details", { errors: "" });
};