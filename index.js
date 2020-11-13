const queries=require('./lib/database/functions');
const express=require('express');
const path=require("path");
const bodyp=require('body-parser');
const {router}=require('./lib/routing');

const app=express();
const port=process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'lib/web/public/')));
app.use(bodyp.urlencoded({extended:true}));
app.use(bodyp.json());
app.use(router);
console.log(path.join(__dirname,'lib/web/public'));
/*queries.addWeight("d2713cb3-e2dc-4586-9a15-9c0051473a38",69,"2020-11-05").then((result)=>{
    console.log(result);
});*/
console.log(__dirname);
app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
});
