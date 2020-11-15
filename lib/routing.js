const functions = require('./database/functions');
const queries=require('./database/functions');
const { checkUserBody } = require('./middlewares');
const router=require('express').Router();

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/web/index.html');
});
router.post('/login',[checkUserBody],(req,res)=>{
    console.log(req.body.username);
    functions.login(req.body['name'],req.body["password"]).then((user)=>{
        res.send(user);
    },(err)=>{
        console.error(err);
        res.json(err);
    });
});
router.post('/register',[checkUserBody],(req,res)=>{
    console.log(req.body.username);
    functions.login(req.body['name'],req.body["password"]).then((user)=>{
        res.send(user);
    },(err)=>{
        console.error(err);
        res.json(err);
    });
});
router.get('*',(req,res)=>{
    res.status(404).send("404 Page not found");
})

module.exports={
    router
}