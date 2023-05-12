const User = require("../models/UserModel");
async function EmailCheck(req,res,next) {
    const user = await User.findOne({email:req.body.email});
    if (user) {
        return res.json({message:"User already exists"})
    }
    next();
}
module.exports = EmailCheck;