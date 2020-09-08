require("dotenv").config();
const { create, getUsers, getUserByEmail } = require("./user.service");
const { hashSync, genSaltSync, compareSync, compare } = require("bcrypt");
const { sign }= require('jsonwebtoken');
module.exports = {
  register: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          data: "unexpected error occured",
        });
      }
      //checking wheather the user is already registered
      if (result.length!==0) {
        return res.json({
          success: 0,
          data: "user already registered",
        });
      } else {
        //generating  hashed password to store in database
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        create(body, (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      }
    });
  },

  login: (req, res) => {
    const body = req.body;
    console.log(body)

    getUserByEmail(body.email, (err, results, fields) => {
      if (err) {
        console.log(err);
      }
      
      if (!results) {
        return res.json({
          success: 0,
          data: "User Not found",
        });
      }
      //verifying password with database..
      const result = body.password === results[0].password
      console.log(results[0].password)


      if (result) {
          //making passwords as undefined for security purpose
          result.password = undefined;

          //generating json token
          const jsontoken = sign ({result:results},process.env.SECRET_KEY,{

            expiresIn:'1h'
          });
          return res.json ({
              success:1,
              message:'Loggged in successfully',
              token:jsontoken
          })


      } 
      
      else {
        return res.json({
          success: 0,
          data: "invalid email or password",
        });
      }
    });
  },

  users: (req, res) => {
    getUsers(req.body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
