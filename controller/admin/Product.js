const Product = require('../../models/productModel');
exports.createProductForm = async (req, res, next)=>{
    res.render('admin/product/add',{env:process.env,success:""});
  }
exports.createProduct = async (req, res, next)=>{
    const thumb = req.files.product_thumb;
    const UploadPath = __dirname+"/../../public/assets/products/thumb/"+thumb.name;
    thumb.mv(UploadPath,async (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("File uploaded");
        }
    });
    const images = req.files.product_image;
    images.map(async image=>{
        const UploadPath = __dirname+"/../../public/assets/products/"+image.name;
        image.mv(UploadPath,async (err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("File uploaded");
            }
        });
    });

    let imageNames = [];
    images.map(async image=>{
        imageNames.push(image.name);
    });

    let {title,product_thumb,product_image,price,color,category,size,description,quantity} = req.body;
    await Product.create({
        title:title,
        thumb:thumb.name,
        image:imageNames,
        category:category,
        quantity:quantity,
        price:price,
        color:color,
        size:size,
        description:description,
        status:"active"
    }).then(product=>{
        console.log(product);
    }).catch(err=>{
        console.log(err);
    })
    res.render('admin/product/add',{env:process.env,success:"Product added successfully"});
    

  }