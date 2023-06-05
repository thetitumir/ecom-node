const product = require("../models/productModel");
const category = require("../models/CategoryModel");
const SITE_URL = process.env.SITE_URL;
exports.HomeController = async (req, res, next) => {
    let page = 1;
    let perpage = 3;
    if (req.query.page !== undefined && req.query.page > 1) {
        page = parseInt(req.query.page);
    }
    let skip = (page - 1) * perpage;
    const productList = await product.find({ status: 'active' }).skip(skip).limit(perpage);
    const categories = await category.find({});
    const user = req.session.user;
    res.render("frontend/home", { user: user, products: productList, SITE_URL: SITE_URL, page: page, category: categories });
}
exports.ProductController = async (req, res, next) => {
    const user = req.session.user;
    const productId = req.params.productId;
    const ProductDetails = await product.findOne({ _id: productId, status: 'active' });
    res.render("frontend/product", { user: user, product: ProductDetails, SITE_URL: SITE_URL });
}