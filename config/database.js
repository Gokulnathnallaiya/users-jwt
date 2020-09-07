const { createPool } = require('mysql');

const pool = createPool({
    host:'localhost',
    port: 3306,
    db:'users-jwt',
    user:'root',
    password:'',
    connectionLimit:10

})

module.exports = pool;