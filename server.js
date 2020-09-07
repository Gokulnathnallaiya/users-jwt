
require("dotenv").config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const userRouter = require("./api/users/user.router");

const port = process.env.PORT || 3000

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("",userRouter);



app.listen(port,()=>{
    console.log('server Up and running ')
})