const User = require("../models/UserModel");
async function EmailCheck(req,res,next) {
    const user = await User.findOne({email:req.body.email});
    if (user) {
        return res.render("frontend/register",{errors:[{path:"Error","msg":"Mail already exists"}]})
    }
    next();
}
module.exports = EmailCheck;