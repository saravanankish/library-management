const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.loginController = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}).exec((err, user) => {
        if(user){
            if(err){
                return res.status(500).send("Unexpected Error Try again")
            }
            bcrypt.compare(password, user.password, function(err, match){
                if(err){
                    return res.status(500).send("Unexpected Error Try again");
                }
                if(match){
                    return res.status(200).json({authorised: true, role: user.role, userId: user._id, message: "Correct Password"});
                }else{
                    return res.status(200).json({authorised: false, message: "Wrong password"})
                }

            })
        }else{
            return res.status(200).send({authorised: false, message: "No User with this email exists"});
        }
    })
}