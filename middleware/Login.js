const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const User = require("../models/UserModel");
const validationRules = [
  body("email").trim().isEmail().withMessage("Please enter your email"),
  body("password").trim().notEmpty().withMessage("Please enter your password")
];

async function Login(req,res,next) {

    await Promise.all(validationRules.map(rule=>rule.run(req)));

    const errors = validationResult(req);
    if(!errors.isEmpty()){
     
      return res.render("frontend/login",{errors:errors.errors});
    }
    const user = await User.findOne({email:req.body.email});
    if (user) {
      const isValidPassword = bcrypt.compareSync(req.body.password,user.password);
      if(isValidPassword){
        req.session.user = user;
        return res.redirect("/");
      }else{
        return  res.render("frontend/login",{errors:[{path:"Error",msg:"Email or password invalid"}]});
      }
       
        
    }else{
      return  res.render("frontend/login",{errors:[{path:"Error",msg:"Email or password invalid"}]});
    }
    
}
module.exports = Login;