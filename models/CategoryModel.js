const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    slug: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date().toString()
    }

});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;