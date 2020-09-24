module.exports = (app) =>{
    const { verifyToken } = require('../../auth/tokenValidation')

    const users = require ("../controllers/user.controller");
    var router = require("express").Router();

    router.get("/",users.testapi);
    router.post("/register",users.register);
    router.post("/login",users.login);
    router.post("/addproduct",users.addproduct);


    app.use("",router)





}