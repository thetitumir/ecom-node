var express = require('express');
const EmailCheck = require("../middleware/EmailCheck");
const Auth = require("../middleware/Auth");
const Login = require("../middleware/Login");
const indexController = require("../controller/Auth");
const HomeController = require("../controller/HomeController");
var router = express.Router();

/* GET home page. */
router.get('/', Auth, HomeController.HomeController);
router.get("/product/:productId",Auth, HomeController.ProductController);
router.get('/product', Auth,indexController.productDetailController);
router.get('/cart',Auth, indexController.cart);
router.get('/cart/address', Auth,indexController.addressDetailController);
router.post('/order',Auth, indexController.productOrderController);
router.get('/order', Auth,indexController.productTrackOrderController);
router.get('/category/:slug',Auth, indexController.categoryDetailController);
router.get('/login', indexController.loginController);
router.post('/login', Login);
router.get('/register', indexController.registerController);
router.post('/register', EmailCheck, indexController.newRegisterController)
router.get("/logout", indexController.logoutController);
module.exports = router;
