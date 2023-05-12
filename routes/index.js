var express = require('express');
var User = require("../models/UserModel");
const EmailCheck = require("../middleware/EmailCheck");
const Auth = require("../middleware/Auth");
const Login = require("../middleware/Login");
var router = express.Router();

/* GET home page. */
router.get('/', Auth,function(req, res, next) {
  const user = req.session.user;
  res.render('frontend/home',{user: user});
});
router.get('/login', function(req, res){
res.render('frontend/login');
});
router.post('/login', Login);

router.get('/register', function(req, res){
  res.render('frontend/register');
})
router.post('/register',EmailCheck, async function(req, res){
  const body = req.body;
  if(body.password && body.cpassword && body.password===body.cpassword) {
   await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      status: "active"
    }).then(user=>{
      req.session.user = user;
      res.redirect("/")
    }).catch((err)=>res.json(err));
  }else{
    res.json({message:"Password does not mache"})
  }

  
})


module.exports = router;
