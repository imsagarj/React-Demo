var express = require('express');
var router = express.Router();
var gravatar = require('gravatar');
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var key = require('../../config/key')
var userModel = require('../../models/User')

// Test API
router.get('/test', function(req, res) {
     res.json({msg:"Successfully send.."})
});

// Register User
router.post('/register',(req,res)=>{
    userModel.findOne({"email":req.body.email})
    .then(user=>{
        if(user){
          return res.status(400).json({email:"Email Already Exist"})
        }else{
             const avatar = gravatar.url(req.body.email,{
                s:'200', //size
                r:'pg', //rating
                d:'mm'  //default
            })
            let newUser = new userModel({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password,

            })

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(error,hash)=>{
                    if(error) throw error;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(error => console.log(error))
                })
            })
        }
    });
});

// Login User

router.post('/login',(req,res)=>{
    let email = req.body.email;
    let password=req.body.password;

    // Find the user
    userModel.findOne({email})
    .then(user =>{
        if(!user){
            return res.status(404).json({email:"User Not Fount"})
        }
        // Check Password
        bcrypt.compare(password,user.password)
            .then(isMatch =>{
                if(!isMatch){
                    return res.json(400).json({password:"password incorrect"})
                }else if(isMatch){
                    //User match with JWT
                    let data = {
                        id:user._id,
                        name:user.name,
                        avatar:user.avatar
                    }
                    // JWT SignIn
                    jwt.sign(data,key.secretKey,{expiresIn:3600},(err,token)=>{
                        res.json({
                            success:true,
                            token:'sagar '+ token
                        })
                    })
                }
               
            })
    })
})
module.exports = router;