
require("dotenv").config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const userRouter = require("./api/users/user.router");

const port = process.env.PORT || 3000;



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("",userRouter);



app.listen(port,()=>{
    console.log('server Up and running ')
})