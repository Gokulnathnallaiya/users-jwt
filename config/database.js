const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({

    // host:'localhost',
    // port:'3306',
    // user:'root',
    // password:'',
    // database:'test',

  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});

module.exports = pool;
