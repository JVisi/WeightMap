const {DataTypes}=require('sequelize');
const {seq}=require('./connector');

const Users=seq.define('User',{
    Id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});
const Weights=seq.define('Weight',{
    Id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    weight:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    }

},{
    timestamps:false
});


Users.hasMany(Weights,{foreignKey:{name:'user_Id',allowNull:false}});
Weights.belongsTo(Users,{foreignKey:{name:'user_Id',allowNull:false}});
module.exports={
    Users,Weights
}