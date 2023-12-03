const { response } = require('express');
const Product = require('../../models/productModel');
const Category = require('../../models/CategoryModel');
const Order = require('../../models/OrderModel');
const User = require('../../models/UserModel');
exports.createProductForm = async (req, res, next) => {
    const categories = await Category.find({});
    res.render('admin/product/add', { env: process.env, success: "", categories: categories });
}
exports.createProduct = async (req, res, next) => {
    const thumb = req.files.product_thumb;
    const UploadPath = __dirname + "/../../public/assets/products/thumb/" + thumb.name;
    thumb.mv(UploadPath, async (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File uploaded");
        }
    });
    const images = req.files.product_image;
    images.map(async image => {
        const UploadPath = __dirname + "/../../public/assets/products/" + image.name;
        image.mv(UploadPath, async (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File uploaded");
            }
        });
    });

    let imageNames = [];
    images.map(async image => {
        imageNames.push(image.name);
    });

    let { title, price, color, category, size, description, quantity } = req.body;
    await Product.create({
        title: title,
        thumb: thumb.name,
        image: imageNames,
        category: category,
        quantity: quantity,
        price: price,
        color: color,
        size: size,
        description: description,
        status: "active"
    }).then(product => {
        console.log(product);
    }).catch(err => {
        console.log(err);
    })
    const categories = await Category.find({});
    res.render('admin/product/add', { env: process.env, success: "Product added successfully", categories: categories });


}

exports.productList = async function (req, res) {
    const products = await Product.find({});
    res.render('admin/product/list', { env: process.env, products: products });
}

exports.productDelete = async function (req, res) {
    //delete product
    const { id } = req.params;
    let isDelete = false;
    await Product.findByIdAndRemove(id).then((e) => { isDelete = true }).catch(err => { isDelete = false });
    res.redirect(`/admin/product/list?delete=${isDelete}`);
}

exports.createCategory = async function (req, res) {
    res.render('admin/category/add', { env: process.env, success: "" });

}
exports.createCategoryToDB = async function (req, res) {
    const { title, slug } = req.body;
    let isCreate = false;
    await Category.create({
        title: title,
        slug: slug
    }).then((category) => { isCreate = true; }).catch(err => { isCreate = false });
    if (!isCreate) {
        var message = `Category ${title} not created`;
    } else {
        message = `Category ${title}  created`;
    }
    res.render('admin/category/add', { env: process.env, success: message });

}
exports.categoryList = async function (req, res) {
    await Category.find().then((category) => { res.render("admin/category/list", { env: process.env, category: category }) }).catch(err => { console.log(err); });

}

exports.categoryDelete = async function (req, res) {
    //delete product
    const { id } = req.params;
    let isDelete = false;
    await Category.findByIdAndRemove(id).then((e) => { isDelete = true }).catch(err => { isDelete = false });
    res.redirect(`/admin/category/list?delete=${isDelete}`);
}
exports.orderList = async function (req, res) {
    try {
      const orderList = await Order.find({ status:  'pending'  });
      res.render('admin/orders/orderList', { env: process.env, orders: orderList });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  exports.activeOrder = async function (req, res) {
    try {
      const orderList = await Order.find({status:"active"});
      res.render('admin/orders/orderList', {env: process.env,  orders: orderList });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  exports.deliveredOrder = async function (req, res) {
    try {
      const orderList = await Order.find({status:"delivered"});
      res.render('admin/orders/orderList', { env: process.env, orders: orderList });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  exports.updateStatus = async function(req,res){
    const { id ,status} = req.params;
    try {
        const updatedOrder = await Order.updateOne(
          { _id: id },
          { $set: { status: status } }
        );
    
        res.redirect("/admin/order/list");
      } catch (error) {
        // Handle any errors that may occur during the update operation
        console.error(error);
        res.status(500).send('Internal Server Error');
      }

  }
  exports.userList = async function(req,res){
    try {
        const users = await User.find({status:{$ne:'delete'}});
        res.render("admin/users/list",{env: process.env, users:users});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  }
  exports.updateUserStatus = async function(req,res){
    const { id ,status} = req.params;
    try {
        const updateUser = await User.updateOne(
          { _id: id },
          { $set: { status: status } }
        );
        res.redirect("/admin/users/list");
      } catch (error) {
        // Handle any errors that may occur during the update operation
        console.error(error);
        res.status(500).send('Internal Server Error');
      }

  }