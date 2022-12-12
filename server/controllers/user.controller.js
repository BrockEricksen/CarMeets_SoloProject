const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const secret = process.env.SECRET_KEY; // SECRET_KEY is coming from my .env file

module.exports = {
    registerUser: async (req,res) => {
        try{
            const newUser = await User.create(req.body)
            const userToken = jwt.sign({_id:newUser._id,email:newUser.email}, secret)
            res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:newUser}) // Send the jwt back to user as a cookie
        }catch (error){
            console.log(error)
            res.status(400).json(error)
        }
    },

    loginUser: async (req,res) => {
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            res.status(400).json({error:"Invalid email/password"})
        }
            try{
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            console.log("Is password valid:",isPasswordValid)
            if(!isPasswordValid) {
                res.status(400).json({error:"Invalid email/password"})
            } else {
                const userToken = jwt.sign({_id:user._id,email:user.email}, secret)
                res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:'User logged in', user:user}) //{httpOnly:true, expires:new Date(Date.now() +  90000)}).json({successMessage:'User logged in', user:user})
            }
        }catch(error){
            res.status(400).json({error:'Invalid email/password'})
        }
    },

    logOutUser: (req,res) => {
        res.clearCookie('userToken')
        res.json({success: 'User logged out'})
    },

    getAllUsers: (req,res) => {
        // console.log(req.Token.id)
        User.find({})
        .then((user)=>{
            res.status(201).json({users:user})
        })
        .catch((err)=>{
            res.status(500).json({message:"Something went wrong",error:err})
        })},
};
