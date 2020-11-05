const {Sequelize}=require('sequelize');

const seq = new Sequelize('weight_map', 'root', 'Oksioksi1', {
    host: 'localhost',
    dialect: 'mysql'
});


const testConnection=()=>seq.authenticate().then(()=>{
    console.log("succes");
},(err=>{console.error(err)}));


module.exports={
    seq,testConnection
}