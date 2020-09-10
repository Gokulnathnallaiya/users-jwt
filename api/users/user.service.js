const pool = require("../../config/database");




module.exports = {
  create: (data, callback) => {
    pool.query(
        `insert into registration(firstName, lastName, gender, email, password, number,role) 
                values(?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.role,
      ], 
      (err, results, fields) => {
        if (err) {
            return callback(err,null);
          
        }
        return callback(null, results);
      }
    );
  },


  getUserByEmail:(email,callback)=>{
      pool.query(
          `SELECT * from registration where email = ?`,[email],
          (err,result,fields)=>{
              if (err){
                  return callback(err,null)
              }
              
              return callback(null,result)
          }

      )
  },



  getUsers:(data,callback)=>{
      pool.query('SELECT id,firstName,lastName,email FROM registration',(err,results,fields)=>{

        if (err){
            return callback(err,null)
        }
        return callback(null,results)
      })
  }
};
