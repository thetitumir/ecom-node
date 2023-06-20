const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    uid: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: Object,
    },
    products: {
        require: true,
        type: Array
    },
    status: {
        required: true,
        type: String,
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: new Date().toDateString(),
    },

});

const Orders = mongoose.model('Orders', OrderSchema);
module.exports = Orders;
