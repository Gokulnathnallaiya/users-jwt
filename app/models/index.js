const dbconig = require("../../config/database");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbconig.database,dbconig.user,dbconig.password,{

    host:dbconig.host,
    dialect:dbconig.dialect,
    operatorAiases:false,

})

const db ={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model")(sequelize,Sequelize);

module.exports = db;