const queries=require('./lib/database/functions');
const {router}=require('./lib/routing')
const express=require('express');
const app=express();
const port=process.env.PORT || 3000;

app.use(router);
/*queries.addWeight("d2713cb3-e2dc-4586-9a15-9c0051473a38",69,"2020-11-05").then((result)=>{
    console.log(result);
});*/
queries.getWeights("d2713cb3-e2dc-4586-9a15-9c0051473a38").then((result)=>{
    console.log(result);
});
app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
});
