const checkUserBody=(req,res,next)=>{
    try{
        let body=req.body;
        if(body['name']==undefined || body['password']==undefined){
            res.status(400).send({"Error":"MISSING DATA"});
            return;
        }
        else if(typeof body['name'] === "string" && typeof body['password'] === "string"){
            console.log("Hello");
            console.log("Hello");
            next();
        }
    }
    catch(e){
        console.error(e);
        res.status(400).send({"Error":"WRONG_VARIABLE"});
        return;
    }
}

module.exports={
    checkUserBody:checkUserBody
}