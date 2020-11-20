const functions = require('./database/functions');
const queries=require('./database/functions');
const { checkUserBody } = require('./middlewares');
const router=require('express').Router();
const url=require('url');

router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/web/index.html');
});

router.post('/login',[checkUserBody],(req,res)=>{
    functions.login(req.body['email'],req.body["password"]).then((user)=>{
        
        //res.render(__dirname+'/web/main.ejs');
        res.redirect(url.format({pathname:"/main",query:{
            'email':user.email,
            'name':user.name
        }}));
       // res.status(200).json({'user':user,'page':'main'});
    },(err)=>{
        console.error(err);
        res.status(400).send(err);
    });
});
router.get('/main',(req,res)=>{
    console.log(req.query.name);
    res.render(__dirname+'/web/main.ejs',{'name':req.query.name,'email':req.query.email});
});
router.post('/register',[checkUserBody],(req,res)=>{
    functions.register(req.body['email'],req.body['name'],req.body["password"]).then((user)=>{
        res.redirect(url.format({pathname:"/main",query:{
            'email':user.email,
            'name':user.name
        }}));
    },(err)=>{
        console.error(err);
        res.status(400).send(err);
    });
});
router.get('*',(req,res)=>{
    res.status(404).send("404 Page not found");
})

module.exports={
    router
}