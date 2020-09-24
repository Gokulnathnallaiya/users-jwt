const { DataTypes, ARRAY } = require('sequelize');

module.exports = (sequelize,Sequelize)=>{

    const User = sequelize.define("users",{
        name:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING

        },
        password:{
            type:Sequelize.STRING
        },
        role:{
            type:Sequelize.STRING
        },
        products: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            
            defaultValue:[]
            
        }
        
    });
    return User;



}