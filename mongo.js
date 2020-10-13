const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');

//import Routes

const productRoutes = require('./mongo_routes/products');
const userRoutes = require('./mongo_routes/users');
const paymentRoutes = require ('./mongo_routes/payments');

//middle wares
app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/products',productRoutes);
app.use('/',paymentRoutes);
app.use('/user',userRoutes);



const port = process.env.PORT || 3000;


mongoose.connect(process.env.mongo_connection,{ useUnifiedTopology: true, useNewUrlParser: true },()=>{
    console.log('connected')
})



//routes


app.get('/',(req,res)=>{
    res.send('app is working')
});




app.listen(port,()=>{
    console.log('server up and running')
})



