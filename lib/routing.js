const functions = require('./database/functions');
const queries=require('./database/functions');
const { checkUserBody,checkDate } = require('./middlewares');
const router=require('express').Router();
const url=require('url');

const checkSessions=(req)=>{
    
    if(req.session.email!=undefined && req.session.name!=undefined){
        
        return true;
    }
    return false;
}
router.get('/',(req,res)=>{
    if(checkSessions(req)){
        console.log("BETA");
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
            console.log(req.session);
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
    if(email!=undefined|null && name!=undefined|null){
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
    req.session.email=null;
    req.session.name=null;
    res.status(200).send("/");
});
router.post('/getWeight',(req,res)=>{
    if(req.body.email==req.session.email){
        functions.getWeights(req.body.email).then((result)=>{
            res.status(200).send(result);
        },(error)=>{
            console.error(error);
            res.status(500).send("Server error");
        });
    }
    else{
        res.status(400).send("Unauthenticated");
    }
});
router.post('/addWeight',[checkDate],(req,res)=>{
    if(req.session.email==req.body.email){
        functions.addWeight(req.body["email"],req.body["weight"],req.body["date"]).then((result)=>{
            console.log(result);
            res.status(200).send(result);
        },
        (err)=>{res.status(500).send("Server error");})
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