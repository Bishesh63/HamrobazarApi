const express=require("express");
const mongoose=require("mongoose");
const morgan = require('morgan');
const user=require("./models/users")
const dotenv = require('dotenv').config();
const userRouter=require('./routes/users');
const uploadRouter=require('./routes/upload');
const productRouter=require('./routes/products');
const cors = require('cors')

const app=express();
app.use(express.json());
app.use(morgan("dev"))
app.options('*', cors());
app.use(express.urlencoded({extended: true }));
app.use(express.static(__dirname + "/public"));
const url = "mongodb://localhost:27017/4thassignment";

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then((db)=>{
    console.log("Sucessfully connected to MongoDB server");
},(err)=>console.log(err));



app.use('/users',userRouter);
app.use('/upload',uploadRouter);
app.use('/products',productRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(3000, () => {
    console.log(`App is running at localhost:3000`);
});

