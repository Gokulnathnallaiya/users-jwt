const express = require("express");
const User = require("../mongo_models/User");
const router = express.Router();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

//create new user
router.post("/register", async (req, res) => {
  const salt = genSaltSync(10);
  req.body.password = hashSync(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  try {
    const newUser = await user.save();
    res.status(200).json({
      email: newUser.email,
      role: newUser.role,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      role: req.body.role,
    });
    const passwordMatch = compareSync(req.body.password,user.password);
    

    if (user && passwordMatch) {
      const { email, role } = req.body;
      return res
        .status(200)
        .json({ email, role, message: "Login successfull" });
    } else {
      return res.json({ success: 0, message: "Invalid email or password" });
    }
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//find user by email

router.post("/findbyemail", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      role: req.body.role,
    });
    res.status(200).json(user);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
