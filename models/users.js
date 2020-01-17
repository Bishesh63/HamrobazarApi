const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        address1:{
            type:String,
            required:true
        },
        address2:{
            type:String,
            required:true
        },
        address3:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        mobilePhone: {
            type: String,
            required: true,
            minlength: 10
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        admin: {
            type: Boolean,
            default: false
        }
    });
    
    module.exports = mongoose.model('User', userSchema);