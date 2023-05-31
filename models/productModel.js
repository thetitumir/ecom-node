const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    size: {
        required: true,
        type: String,
        default: "user"
    },
    description: {
        required: true,
        type: String,
    },
    thumb: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: Array
    },
    quantity: {
        required: true,
        type: Number
    },
    status: {
        required: true,
        type: String,
        default: "active"
    },
    createdAt: {
        type: Date,
        default: new Date().toDateString(),
    },

});

const Product = mongoose.model('Products', productSchema);
module.exports = Product;
