const router = require('express').Router();
const user = require("../models/user");

//sign up
router.post("/sign-up",async(req,res)=>{
    try{
        const{username,email,password,address}=req.body;

        //check their constraints
        if(username.length<4){
            return res
            .status(400) //error caused by user
            .json({message:"Username length should be greater than 4 characters"});
        }

        //check username exists?
        const existingUsername = await user.findOne({username:username});
        if(existingUsername){
            return res.status(400).json({message:"Username already exists!"});
        }

        //check email exists?
        const existingEmail = await user.findOne({email:email});
        if(existingEmail){
            return res.status(400).json({message:"Email already exists!"});
        }

        //check password length
        if(password.length<5){
            return res
            .status(400) //error caused by user
            .json({message:"Password length should be greater than 5 characters"}); 
        }

        const newUser=new user({
            username:username,
            email:email,
            password:password,
            address:address,
        });
        await newUser.save();
        return res.status(200).json({message:"Signed Up Successfully"});
    }
    catch(error){
        // 500->error caused by backend
        res.status(500).json({message:"Internet server error"});
    }
});

module.exports= router;