var express = require('express');
var router = express.Router();
const adminController = require("../controller/admin/Auth")
const Login = require("../middleware/admin/Login");
/* GET home page. */
router.get('/', Login ,adminController.getHomePage);
router.get('/product/add', Login ,adminController.createProduct);

module.exports = router;
