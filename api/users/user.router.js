const { register,login,users} =require('./user.controller');
const router = require("express").Router();

const { verifyToken } = require('../../auth/tokenValidation')


router.post("/register",register);
router.post("/login",login);

//jwt verification sample api's
router.get("/users",verifyToken,users);
router.get("/",verifyToken,(req,res)=>{
    res.json({
        success:1,
        message:"App is working  successfuly"
    })
})

module.exports = router;