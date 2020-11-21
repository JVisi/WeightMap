const { seq } = require('./connector');
const {Weights,Users}=require('./enitites');
const uuid = require('uuid').v4;
const bcrypt=require('bcrypt');


const hashPass=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password, 2, function(err, hash) {
            if(err){
                console.error(err)
                reject();
            }
            else{
                resolve(hash);
            }
        });
    });
}
const comparePass=async (password,encrypted)=>{
    let res=await bcrypt.compare(password,encrypted);
    return res;
}

const selectUserByEmail=(email)=>{
    return new Promise((resolve,reject)=>{
        Users.findOne({
            where:{
                    'email':email
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
const login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        Users.findOne({
            where:{
                    'email':email
            }
        }).then((result)=>{
            if(result!=null){
                comparePass(password,result.dataValues.password).then((password_isGood)=>{
                    if(password_isGood){
                        resolve(result.dataValues);
                    }
                    else{
                        reject("Password no good");
                    }
                });
            }
            else{reject("No such user")}
        },(err)=>{console.error(err);reject("db error")});
    });
}
const register=(email,name,passw)=>{               //ToDo findOrCreate ??
    return new Promise((resolve,reject)=>{
        hashPass(passw).then((password)=>{
            Users.findOrCreate({
                where:{
                        'email':email
                },defaults:{
                    'Id':generateId(),
                    'name':name,
                    'password':password
                }
            }).then((result)=>{
                console.log(result[0]._options.isNewRecord);
                if(result[0]._options.isNewRecord){
                    resolve(result[0]);
                }
                else{
                    reject("Not new record");
                }
            },(err)=>{console.error(err);reject("db error")});
        });
    });
}
const getWeights=(email)=>{
    return new Promise((resolve,reject)=>{
        selectUserByEmail(email).then((user)=>{
            console.log(user.dataValues.Id);
            Weights.findAll({order:seq.col('date'),
                where:{
                        'user_Id':user.dataValues.Id
                }
            }).then((result)=>{
                if(result!=null){
                    let data=[];
                    for (let index = 0; index < result.length; index++) {
                        const element = result[index];
                        data.push({'date':element.dataValues.date,'weight':element.dataValues.weight});
                        
                    }
                    resolve(data);
                }
                else{
                    reject("No such record");
                }
            },(err)=>{console.error(err);reject("db error")});
        },()=>{reject("Missing user")});
    });
}
const addWeight=(email,weight,date)=>{
    return new Promise((resolve,reject)=>{

        let id= generateId();
        selectUserByEmail(email).then((user)=>{
            Weights.create({
                    'Id':id,
                    'weight':weight,
                    'date':date,
                    'user_Id':user.dataValues.Id  ///Check this row
                }).then((result)=>{
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
    generateId,
    selectUserByEmail,
    login,
    register,
    getWeights,
    addWeight,
    hashPass,
    comparePass
}