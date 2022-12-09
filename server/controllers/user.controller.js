const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const secret = process.env.SECRET_KEY;

// const UserControllers = {

register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
        }, secret); // SECRET_KEY is coming from my .env file

        res
            .cookie("usertoken", userToken, {
                httpOnly: true  // this makes it so browser will not have access to these cookies
            })
            .json({ msg: "Successfully registered!", user: user });
        })
        .catch(err => res.json(err));
}

login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if(user === null) { // email not found in users collection
        return res.status(400).json;
    }
    
    // if we made it this far, we found a user with an email address
    const correctPassword = await bcrypt.compare(req.body.password, user.password); // compare submitted password to the hashed password in the database
    
    if(!correctPassword) { // if submitted password doesnt match database password stored corresponding to the email
        return res.status(400).json;
    }
    
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
    
    res // response given once email and password match an existing user
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "Successfully logged-in!" });
}

logout = (req, res) => {
    res.clearCookie('usertoken');
    res.status(200).json({user: "Logged out!"});
}

getAll = (req,res)=>{
    User.find({})
    .then((users)=>{
        res.json(users)
    })
    .catch((err)=>{
        console.log("Error getting users!")
    })
}
// };

module.exports = { register, login, logout, getAll };
// module.exports = {UserControllers};