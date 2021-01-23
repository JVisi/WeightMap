const {Sequelize}=require('sequelize');

//mysql://b6a8ed4e2dd30b:8770c566@eu-cdbr-west-03.cleardb.net/heroku_f24c4628c23085c?reconnect=true

const seq = new Sequelize('weight_map', 'username', 'password', {       
    host: 'localhost',
    dialect: 'mysql'
});
 
const seqHeroku = new Sequelize('db_id', 'Id', 'password', {
    host: 'eu-cdbr-west-03.cleardb.net',
    dialect: 'mysql'
});


const testConnection=()=>seq.authenticate().then(()=>{
    console.log("succes");
},(err=>{console.error(err)}));


module.exports={
    seq:seqHeroku,
    testConnection
}
