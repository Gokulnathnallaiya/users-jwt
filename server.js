
require("dotenv").config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const userRouter = require("./api/users/user.router");

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("",userRouter);

// app.get("/api",(req,res)=>{

//     res.json({
//         success:1,
//         message:"this rest api working"
//     })
// })

app.listen(process.env.PORT,()=>{
    console.log('server Up and running ')
})