const queries=require('./database/functions');
const router=require('express').Router();

router.get('/',(req,res)=>{
    res.send('hello woasdfrld');
});
router.post('/login',(req,res)=>{
    console.log(req.params);
    queries.login(req.params)
});
router.get('*',(req,res)=>{
    res.status(404).send("404 Page not found");
})

module.exports={
    router
}