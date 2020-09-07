const { create, getUsers, getUserByEmail } = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const pool = require("../../config/database");

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
      if (result.length!==0) {
        return res.json({
          success: 0,
          data: "user already registered",
        });
      } else {
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
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
      const result = compareSync(body.password, results[0].password);

      if (result) {
        return res.json({
          msg: "Logged in successfully",
        });
      } else {
        return res.json({
          success: 1,
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
