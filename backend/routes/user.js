const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");
//sign up
router.post("/sign-up",async(req,res)=>{
    try{
        const{username,email,password,address}=req.body;
        console.log("Incoming Data:", req.body);

        // validate fields first
        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check their constraints
        if(username.length<4){
            return res
            .status(400) //error caused by user
            .json({message:"Username length should be greater than 4 characters"});
        }

        //check password length
        if(password.length<5){
            return res
            .status(400) //error caused by user
            .json({message:"Password length should be greater than 5 characters"}); 
        }
        const hashedPassword=await bcrypt.hash(password,10); //hashing the password
        
        //check username exists?
        const existingUsername = await User.findOne({username:username});
        if(existingUsername){
            return res.status(400).json({message:"Username already exists!"});
        }

        //check email exists?
        const existingEmail = await User.findOne({email:email});
        if(existingEmail){
            return res.status(400).json({message:"Email already exists!"});
        }


        const newUser=new User({
            username:username,
            email:email,
            password:hashedPassword,
            address:address,
        });
        await newUser.save();
        return res.status(200).json({message:"Signed Up Successfully"});
    }
    catch(error){
        // 500->error caused by backend
        // 200->success
        res.status(500).json({message:"Internet server error"});
    }
});


//sign in
router.post("/sign-in",async(req,res)=>{
    try{
        const{username,password}=req.body;

        //check username exists?
        const existingUser = await User.findOne({username:username});
        if(!existingUser){
            return res.status(400).json({message:"Invalid username or password"});
        }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims=[
                    {name:existingUser.username},
                    {email:existingUser.email},
                    {role:existingUser.role}
                ];
                const token=jwt.sign({authClaims},"bookstoreSecretKey",{expiresIn:"30d"});
                res.status(200).json({
                    id:existingUser._id,
                    username:existingUser.username,
                    email:existingUser.email,
                    role:existingUser.role,
                    token:token,
                    message:"Logged In Successfully"});
            }
            else{
                res.status(400).json({message:"Invalid username or password"});
            }
        });
    }
    catch(error){
        // 500->error caused by backend
        // 200->success
        res.status(500).json({message:"Internet server error"});
    }

        
});

//get user details
router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const data=await User.findById(id).select("-password"); //exclude password from the result
        return res.status(200).json({data:data});
    }
    catch(error){
        res.status(500).json({message:"Internet server error"});
    }
});

//update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internet server error"});
    }
});
module.exports= router;