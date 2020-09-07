const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.get("authorization");

    if (token) {
      //removing bearer from token
      token = token.slice(7);
      jwt.verify(token, "secretkey", (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access denied !",
      });
    }
  },
};
