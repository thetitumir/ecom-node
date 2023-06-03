const product = require("../models/productModel");
const SITE_URL = process.env.SITE_URL;
exports.HomeController = async (req, res, next) => {
    const productList = await product.find({ status: 'active' });
    const user = req.session.user;
    res.render("frontend/home", { user: user, products: productList, SITE_URL: SITE_URL });
}
exports.ProductController = async (req, res, next) => {
    const user = req.session.user;
    const productId = req.params.productId;
    const ProductDetails = await product.findOne({ _id: productId, status: 'active' });
    res.render("frontend/product", { user: user, product: ProductDetails, SITE_URL: SITE_URL });
}