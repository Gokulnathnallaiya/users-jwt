module.exports = (app) =>{
    const { verifyToken } = require('../../auth/tokenValidation')

    const users = require ("../controllers/user.controller");
    var router = require("express").Router();

    router.get("/",verifyToken,users.testapi);
    router.post("/register",users.register);
    router.post("/login",users.login);


    app.use("",router)





}