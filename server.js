require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middle wares..
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require('./app/models');
db.sequelize.sync()
require("./app/routes/user.routes")(app);
const port = process.env.PORT || 3000;



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));





app.listen(port,()=>{
    console.log('server Up and running ')
})