const db = require("../models");
const { sign }= require('jsonwebtoken');
const { json } = require("body-parser");


const User = db.user;
const op = db.Sequelize.Op;

exports.register = (req,res)=>{
    if (!req.body){
        return res.status(500).send({
            message:"Content cannot be empty"
        });
    }
    const user ={
        name : req.body.name,
        email: req.body.email,
        password : req.body.password,
        role : req.body.role,
    }
    User.create(user)
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message || "some error occured"
        });
    });
};

exports.login = (req,res)=>{

    User.findAll ({where : { email : req.body.email }})
    .then((data)=>{
        const result = req.body.password === data[0].password
        if (req.body.role !== data[0].role){

            return res.status(403).json({
              success:0,
              message: 'Role Mismatch. Accees denied !!',
            })
    
    
          }
        
        
        if (result){
            const jsontoken = sign ({data:data},process.env.JWT_KEY,{

                expiresIn:'1h'
              });
            res.send({
                message : "Logged in successfully",
                Token : jsontoken
            })

        }
        else{
            res.send({
                message : "Invaid Email or Password"
            })
        }
        






    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message || "some error occured"
        });
    });



}

exports.testapi = (req,res)=>{
    res.send({

        message : "App Working Successfully"

    })
}