var User = require("../models/UserModel");
const {body,validationResult} = require('express-validator');
exports.indexController = (req, res, next) =>{
    const user = req.session.user;
    res.render('frontend/home',{user: user});
  }
exports.loginController = (req, res)=>{
    res.render('frontend/login',{errors:""});
    }
exports.registerController = (req, res)=>{
        res.render('frontend/register',{errors:""});
      }

const RegvalidationRules = [
        body("name").trim().notEmpty().withMessage("Please enter your name"),
        body("email").trim().isEmail().withMessage("Please enter your email"),
        body("password").trim().notEmpty().withMessage("Please enter your password"),
        // body("cpassword").equals(body("password")).withMessage("confirm password does not match with your password"),
];      
exports.newRegisterController = async (req, res)=>{
    await Promise.all(RegvalidationRules.map(rule=>rule.run(req)));

    const errors = validationResult(req);
    if(!errors.isEmpty()){

      return res.render("frontend/register",{errors:errors.errors});
    }else{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            status: "active"
          }).then(user=>{
            req.session.user = user;
            res.redirect("/")
          }).catch((err)=>res.json(err));
    }


 

  
}