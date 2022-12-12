const jwt = require("jsonwebtoken");
const User = require('../models/user.model')
const secret = process.env.SECRET_KEY;

module.exports = {

    authenticate: (req, res, next) => {
        jwt.verify(req.cookies.userToken, secret, (err, payload) => {
            if (err) {
                console.log('User not authorized: jwt config.')
                res.status(401).json({verified: false});
            } else {
                console.log('Auth success: jwt config.')
                req.Token = payload
                next();
            }
        })
    },

    isLoggedIn: async (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.userToken, {complete: true });
        User.findById(decodedJWT.payload._id)
        .then(user => 
            res.json({user:user}))
        .catch(err =>
            res.status(400).json({message: 'Unauthorized'}));
    }
};