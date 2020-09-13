const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{

    const User = sequelize.define("users-db",{
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
        }
    });
    return User;



}