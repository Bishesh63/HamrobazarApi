const mongoose=require('mongoose');

const productSchema=new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true
        },
        productPrice:{
            type:String,
            required:true
        },
        productType:{
            type:String,
            required:true
        },
        image: {
            type: String
        }
    });
    
    module.exports = mongoose.model('Product', productSchema);