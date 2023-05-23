exports.getHomePage = async (req, res, next)=> {
    res.render('admin/index');
  }

  exports.createProduct = async (req, res, next)=>{
    res.render('admin/product/add',{env:process.env});
  }