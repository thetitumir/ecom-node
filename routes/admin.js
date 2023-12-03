var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const adminController = require("../controller/admin/Auth")
const Product = require("../controller/admin/Product")
const Login = require("../middleware/admin/Login");
/* GET home page. */
router.use(fileUpload());
router.get('/', Login, adminController.getHomePage);
router.get('/product/add',Login, Product.createProductForm);
router.post('/product/add',Login, Product.createProduct);
router.get('/product/list', Login,Product.productList);
router.get('/product/delete/:id', Login,Product.productDelete);
//category
router.get('/category/add',Login, Product.createCategory);
router.get('/category/list', Login,Product.categoryList);
router.get('/category/delete/:id', Login,Product.categoryDelete);
router.post('/category/add',Login,Product.createCategoryToDB);
router.get('/order/list', Login,Product.orderList);
router.get('/order/active',Login, Product.activeOrder);
router.get('/order/delivered',Login, Product.deliveredOrder);
router.get('/order/updateStatus/:id/:status', Login,Product.updateStatus);
router.get('/users/list', Login,Product.userList);
router.get('/users/updateUserStatus/:id/:status',Login, Product.updateUserStatus);
module.exports = router;
