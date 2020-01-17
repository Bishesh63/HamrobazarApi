const express = require('express');
const Product = require('../models/products');
const router = express.Router();



router.get('/',(req,res,next)=>{
    Product.find({},(err,products)=>
    {
        if(err){
            res.json(next)
        }
        res.json(products)
    });
})

router.post('/',(req,res,next)=>{
    Product.create({
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productType:req.body.productType,
        image:req.body.image
    }).then((result)=>{
        res.json({message:"product created successfully"});
    }).catch(next);
})

module.exports=router;
