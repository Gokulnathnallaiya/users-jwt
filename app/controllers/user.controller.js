const db = require("../models");
const { sign }= require('jsonwebtoken');
const { json } = require("body-parser");
const Sequelize = require('sequelize');



const User = db.user;
const op = db.Sequelize.Op;

exports.register = (req,res)=>{
    User.findAll ({where : { email : req.body.email }}).then(user=>{if(user){
        return res.status(409).send({
            success:0,
            message:"user Already registered"
        })
    }})
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
        res.send({success:1,data});
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
                success:1,
                message : "Logged in successfully",
                Token : jsontoken
            })

        }
        else{
            res.send({
                success:0,
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
    User.findAll().then(function(users){
        
        res.send(users);
      }).catch(function(err){
        console.log('Oops! something went wrong, : ', err);
      });
}

exports.addproduct = (req,res)=>{
    User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then (user=>{
        let temp = JSON.parse(user.products);
        temp.push(req.body.item)
        user.update({products:temp}).then(updatedrecord=>res.send(JSON.stringify(updatedrecord)))
      })

}