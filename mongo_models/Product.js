const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,

    },
    availablestock:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
        
    },


})

module.exports = mongoose.model('products',ProductSchema);