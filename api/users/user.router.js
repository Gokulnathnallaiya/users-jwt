const { register,login,users} =require('./user.controller');
const router = require("express").Router();


router.post("/register",register);
router.post("/login",login);
router.get("/users",users);

module.exports = router;