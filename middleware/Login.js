const User = require("../models/UserModel");
async function Login(req,res,next) {
    const user = await User.findOne({email:req.body.email,password:req.body.password});
    if (user) {
        req.session.user = user;
        res.redirect("/");
    }else{
        res.redirect("/login");
    }
    
}
module.exports = Login;