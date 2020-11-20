const express=require('express');
const path=require("path");
const bodyp=require('body-parser');
const {router}=require('./lib/routing');
const functions = require('./lib/database/functions');
const ejs=require('ejs');
const { generateId } = require('./lib/database/functions');
const session=require('express-session');

const app=express();
const port=process.env.PORT || 3000;
app.use(session({
    genid: function(req) {
        return generateId() // use UUIDs for session IDs
      },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie  : { secure:false,maxAge  : new Date(Date.now() + (600000)) } //10 minutes
  }));
app.use(express.static(path.join(__dirname,'lib/web/public/')));
app.use(bodyp.urlencoded({extended:true}));
app.use(bodyp.json());

app.use(router);

console.log(__dirname);

console.log(functions.generateId());
app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
});
