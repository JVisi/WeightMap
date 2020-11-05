const {seq,testConnection} =require('./lib/database/connector');
const {Users,Weights}=require('./lib/database/enitites')
testConnection();
Weights.findAll({include:Users}).then((result)=>{
    console.log(result[0]);
})