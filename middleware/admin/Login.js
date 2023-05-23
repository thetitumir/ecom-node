const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const User = require("../../models/UserModel");


async function Login(req,res,next) {

    
    if(req.session.user){
      var user = await User.findOne({email:req.session.user.email});
    }else{
     return res.redirect('/login');
    }
    
    if (user) {
      if(user.status=='active' && user.role=='admin'){
        req.session.user = user;
        next();
      }else{
        return  res.render("frontend/login",{errors:[{path:"Error",msg:"Access denied"}]});
      }
       
        
    }else{
      return  res.render("frontend/login",{errors:[{path:"Error",msg:"Email or password invalid"}]});
    }
    
}
module.exports = Login;