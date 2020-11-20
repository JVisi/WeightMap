const checkUserBody=(req,res,next)=>{
    try{
        let body=req.body;
        if(body['email']==undefined || body['password']==undefined){
            res.status(400).send({"Error":"MISSING DATA"});
            return;
        }
        else if(typeof body['email'] === "string" && typeof body['password'] === "string" && body['password'].length>3){
            if(body['name']!=undefined){
                if(typeof body['name'] === "string" && body['name'].length>2 && body['password_2']===body['password']){
                    next();
                }
                else{
                    res.status(400).send({"Error":"MIsSSING DATA"});
                    return;
                }
            }
            else{
                next();
            }
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