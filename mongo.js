const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

//import Routes

const postRoutes = require('./mongo_routes/posts');
const userRoutes = require('./mongo_routes/users');

//middle wares


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/posts',postRoutes);
app.use('/user',userRoutes);


mongoose.connect(process.env.mongo_connection,{ useUnifiedTopology: true, useNewUrlParser: true },()=>{
    console.log('connected')
})



//routes


app.get('/',(req,res)=>{
    res.send('app is working')
});




app.listen(3000,()=>{
    console.log('server up and running')
})



