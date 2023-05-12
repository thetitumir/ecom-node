const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        required: true,
        type:String
    },
    email: {
        required:true, 
        type:String
    },
    password:{
        required:true, 
        type:String
    },
    role:{
        required:true, 
        type:String,
        default:"user"
    },
    addres:{
        required:false,
        type:String,
    },
    phone:{
        required:false,
        type:Number
    },
    gender:{
        required:false,
        type:String
    },
    status:{
        required:true,
        type:String,
        default:"active"
    }

});

const User = mongoose.model('User',userSchema);
module.exports = User;