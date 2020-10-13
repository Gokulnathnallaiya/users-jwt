const express = require("express");
const User = require("../mongo_models/User");
const router = express.Router();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");


//create new user
router.post("/signup", async (req, res) => {
  const users = await User.find({
    email: req.body.email,
  });
  if (users.length > 0) {
    return res.status(200).json({
      success: 0,
      message: "user already registered",
    });
  }
  const salt = genSaltSync(10);
  password = hashSync(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });
  try {
    const newUser = await user.save();
    res.status(200).json({
      success: 1,
      email: newUser.email,
      message: "Account created successfully",
    });
  } catch (err) {
    res.json({ message: "An error occured" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const passwordMatch = compareSync(req.body.password, user.password);

    if (user && passwordMatch) {
      const { email } = req.body;
      return res
        .status(200)
        .json({ email, success: 1, message: "Login successfull" });
    } else {
      return res.json({ success: 0, message: "Invalid email or password" });
    }
  } catch (err) {
    res.json({
      message: "An error occured",
    });
  }
});

//find user by email

router.post("/findbyemail", async (req, res) => {
  try {
    const user = await User.findOne({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(200).json(user);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

module.exports = router;
