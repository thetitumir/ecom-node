var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const adminController = require("../controller/admin/Auth")
const Product = require("../controller/admin/Product")
const Login = require("../middleware/admin/Login");
/* GET home page. */
router.use(fileUpload());
router.get('/', Login ,adminController.getHomePage);
router.get('/product/add', Login,  Product.createProductForm);
router.post('/product/add', Login, Product.createProduct);

module.exports = router;
