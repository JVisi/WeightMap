const express=require('express');
const path=require("path");
const bodyp=require('body-parser');
const {router}=require('./lib/routing');
const functions = require('./lib/database/functions');
const ejs=require('ejs');
const { hashPass } = require('./lib/database/functions');

const app=express();
const port=process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'lib/web/public/')));
app.use(bodyp.urlencoded({extended:true}));
app.use(bodyp.json());
app.use(router);

console.log(__dirname);

console.log(functions.generateId());
app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
});
