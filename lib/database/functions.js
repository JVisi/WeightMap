const { seq } = require('./connector');
const {Weights,Users}=require('./enitites');
const uuid = require('uuid').v4;
const bcrypt=require('bcrypt');


const hashPass=(password)=>{
    bcrypt.hash(password, 2, function(err, hash) {
        if(err){
            console.error(err)
        }
        else{
            return hash;
        }
    });
}
const comparePass=(password)=>{
    bcrypt.compare(password,(err,res)=>{
        if(res){
            return true;
        }
        return false;
    });
}

const selectUserById=(userId)=>{
    return new Promise((resolve,reject)=>{
        Users.findOne({
            where:{
                    'Id':userId
            }
        }).then((result)=>{
            if(result!=null && result[0]===seq.models.Users){
                resolve(result);
            }
            else{
                reject("No such record");
            }
        },(err)=>{console.error(err);reject("db error")});
    });
}
const login=(name,password)=>{
    return new Promise((resolve,reject)=>{
        Users.findOne({
            where:{
                    'name':name,
                    'password':password
            }
        }).then((result)=>{
            if(result!=null){
                resolve(result);
            }
            else{
                reject("No such record");
            }
        },(err)=>{console.error(err);reject("db error")});
    });
}
const register=(name,password)=>{               //ToDo findOrCreate ??
    return new Promise((resolve,reject)=>{
        Users.findOne({
            where:{
                    'name':name,
                    'password':password
            }
        }).then((result)=>{
            if(result==null){
                Users.create({
                    Id:generateId(),
                    'name':name,
                    'password':hashPass(pass)
                }).then((result)=>{
                    resolve(result);
                },(err)=>{
                    console.error(err);reject("db error")
                });
            }
            else{
                reject("Already exist");
            }
        },(err)=>{console.error(err);reject("db error")});
    });
}
const getWeights=(userId)=>{
    return new Promise((resolve,reject)=>{
        Weights.findAll({
            where:{
                    'user_Id':userId
            }
        }).then((result)=>{
            if(result!=null){
                resolve(result);
            }
            else{
                reject("No such record");
            }
        },(err)=>{console.error(err);reject("db error")});
    });
}
const addWeight=(userId,weight,date)=>{
    return new Promise((resolve,reject)=>{

        let id= generateId();
        selectUserById(userId).then(()=>{
            console.log("----------------------"+id);
            Weights.create({
                    'Id':id,
                    'weight':weight,
                    'date':date,
                    'user_Id':userId
                }).then((result)=>{
                console.log(result);
                if(result!=null && result[0]===seq.models.Weights){
                    resolve(result);
                }
            },(err)=>{
                console.error(err);
                reject("db error");
            });
        },()=>{reject("Missing user")});
    });
}

//private
const generateId=()=>{
    return uuid();
}
module.exports={
    selectUserById,
    login,
    register,
    getWeights,
    addWeight,
    encrypt
}