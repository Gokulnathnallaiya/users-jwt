const express = require("express");
const User = require("../mongo_models/User");
const router = express.Router();

//create new user
router.post("/register", async (req, res) => {
  const user = new User(user);
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


module.exports = router;
