var express = require('express');
const EmailCheck = require("../middleware/EmailCheck");
const Auth = require("../middleware/Auth");
const Login = require("../middleware/Login");
const indexController = require("../controller/Auth");
const HomeController = require("../controller/HomeController");
var router = express.Router();

/* GET home page. */
router.get('/', Auth, HomeController.HomeController);
router.get("/product/:productId", HomeController.ProductController);
router.get('/product', indexController.productDetailController);
router.get('/login', indexController.loginController);
router.post('/login', Login);
router.get('/register', indexController.registerController);
router.post('/register', EmailCheck, indexController.newRegisterController)
router.get("/logout", indexController.logoutController);
module.exports = router;
