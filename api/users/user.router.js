const { register,login,users} =require('./user.controller');
const router = require("express").Router();

const { verifyToken } = require('../../auth/tokenValidation')


router.post("/register",register);
router.post("/login",login);

//jwt verification saample api
router.get("/users",verifyToken,users);

module.exports = router;