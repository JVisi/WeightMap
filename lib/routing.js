const functions = require('./database/functions');
const queries=require('./database/functions');
const { checkUserBody } = require('./middlewares');
const router=require('express').Router();
const url=require('url');

const checkSessions=(req)=>{
    
    if(req.session.email!=undefined && req.session.name!=undefined){
        return true;
    }
}
router.get('/',(req,res)=>{
    if(checkSessions(req)){
        res.redirect("/main");
    }else{
        res.sendFile(__dirname+'/web/index.html');
    }
});

router.post('/login',[checkUserBody],(req,res)=>{
    if(checkSessions(req)){
        res.redirect("/main");
        console.log("hello");
    }else{
        functions.login(req.body['email'],req.body["password"]).then((user)=>{
            req.session.email=user.email;
            req.session.name=user.name;
                res.redirect("/main");
        },(err)=>{
            console.error(err);
            res.status(400).send(err);
        });
    }
});
router.get('/main',(req,res)=>{
    console.log(req.session);
    let email=req.session.email;
    let name=req.session.name;
    if(email!=undefined && name!=undefined){
        res.render(__dirname+'/web/main.ejs',{'name':name,'email':email});
    }
    else{
        res.redirect("/");
    }
});
router.post('/register',[checkUserBody],(req,res)=>{
    if(checkSessions(req)){
        res.redirect("/main");
    }else{
        functions.register(req.body['email'],req.body['name'],req.body["password"]).then((user)=>{
            req.session.email=user.email;
            req.session.name=user.name;
                res.redirect("/main");
        },(err)=>{
            console.error(err);
            res.status(400).send(err);
        });
    }
});
router.post('/logout',(req,res)=>{
    console.log("hello");
    req.session.destroy();
    res.status(200).send("/");
});
router.post('/getWeight',(req,res)=>{
    if(req.body.email==req.session.email){
        functions.getWeights(req.body.email).then((result)=>{
            res.status(200).send(result);
        },(error)=>{
            res.status(500).send("Server error");
        });
    }
    else{
        res.status(400).send("Unauthenticated");
    }
});
router.get('*',(req,res)=>{
    res.status(404).send("404 Page not found");
})

module.exports={
    router
}