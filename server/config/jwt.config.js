const jwt = require("jsonwebtoken");
const User = require('../models/user.model')
const secret = process.env.SECRET_KEY; // MIGHT NEED TO CHANGE THIS... TBD

module.exports.secret = secret;

module.exports = {

    authenticate: (req, res, next) => {
        console.log(req.cookies.usertoken, " <-- is the usertoken, line 10 in jwt.config for authenticate")
        jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
            if (err) { 
                res.status(401).json({verified: false});
            } else {
                req.Token = payload
                next();
            }
        })
    },

    isLoggedIn: (req, res) => {
        console.log(req.cookies, " <-- is the cookies, line 22 in jwt.config for isLoggedIn")
        jwt.verify(req.cookies.usertoken, secret, async (err, payload) => {
            if (err) { 
                res.status(401).json({verified: false});
            } else {
                const user = await User.findOne({_id: payload.id})
                const {_id,firstName} = user
                return res.json({user:{id: _id, name: firstName}})
            }
        })
    },
}