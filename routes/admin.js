var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const adminController = require("../controller/admin/Auth")
const Product = require("../controller/admin/Product")
const Login = require("../middleware/admin/Login");
/* GET home page. */
router.use(fileUpload());
router.get('/', Login, adminController.getHomePage);
router.get('/product/add', Product.createProductForm);
router.post('/product/add', Product.createProduct);
router.get('/product/list', Product.productList);
router.get('/product/delete/:id', Product.productDelete);
//category
router.get('/category/add', Product.createCategory);
router.get('/category/list', Product.categoryList);
router.get('/category/delete/:id', Product.categoryDelete);
router.post('/category/add', Product.createCategoryToDB);

module.exports = router;
