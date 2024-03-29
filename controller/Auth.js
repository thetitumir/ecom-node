var User = require("../models/UserModel");
var categoryModel = require("../models/CategoryModel");
var product = require("../models/productModel");
var Orders = require("../models/OrderModel");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
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
exports.categoryDetailController = async (req, res) => {
  let page = 1;
  let perpage = 3;
  if (req.query.page !== undefined && req.query.page > 1) {
    page = parseInt(req.query.page);
  }
  let skip = (page - 1) * perpage;
  const slug = req.params.slug;
  const categoryList = await categoryModel.find();
  const productList = await product.aggregate([{ $lookup: { from: "categories", localField: "category", foreignField: "slug", as: "category" } }, { $match: { "category.slug": slug } }, { $skip: skip }, { $limit: perpage }]);
  console.log(productList[0]._id);
  res.render("frontend/category", {  user: user,errors: "", products: productList, SITE_URL: process.env.SITE_URL, category: categoryList, page: page });
}
exports.cart = async (req, res) => {
  const user = req.session.user;
  res.render("frontend/cart", {  user: user,errors: "", SITE_URL: process.env.SITE_URL })
}
exports.addressDetailController = async (req, res) => {
  const user = req.session.user;
  res.render("frontend/address", { user: user, errors: "", SITE_URL: process.env.SITE_URL })
}
exports.productOrderController = async (req, res) => {
  const { fullname, address, products, zip, payment_type } = req.body;
  const addressObj = {
    fullname: fullname,
    address: address,
    zip: zip,
    payment_type: payment_type
  };
  const productObj = JSON.parse(products);
  const { _id, name, email } = req.session.user;
  console.log(productObj);
  await Orders.create({
    uid: _id,
    name: name,
    email: email,
    address: addressObj,
    products: productObj
  }).then(() => console.log("Order created"));
  res.redirect("/order");
}
exports.productTrackOrderController = async (req, res, next) => {
  const user = req.session.user;
  const orders = await Orders.find({ uid: req.session.user._id, status: { $ne: "delivered" } });
  res.render("frontend/track", {  user: user,errors: "", SITE_URL: process.env.SITE_URL, orders: orders });
}