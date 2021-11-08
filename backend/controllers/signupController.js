// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");


//variables
const saltRounds = 15;


exports.signupController = async (req, res) => {
    var {name, email, password, role} = req.body;
    // var token;
    await bcrypt.hash(password, saltRounds).then(function(hashedPassword) {
        password = hashedPassword;
        // token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, { expiresIn: "20m" });
    })
    User.findOne({email}).exec((err, user) => {
        if(user)
            return res.status(200).json({status: false, message: "User with this mail already exists"});
        // var transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.PASSWORD
        //     }
        // });
        // var mailOptions = {
        //     from: process.env.EMAIL_USER,
        //     to: "saravananlalitha2001@gmail.com",
        //     subject: "Verify your email Library Management",
        //     html: `
        //         <h2>Verify You Mail</h2>
        //         <p>Verify your mail before 20 minutes by click the below link to confirm your user registration</p>
        //         <a href="${process.env.CLIENT_URL}/activate/${token}" style="padding:10px 10px; background:dodgerblue; color:white; text-decoration:none; font-size: 18px;">Verify Email</a>
        //     `
        // }
        // transporter.sendMail(mailOptions, function(err, info){
        //     if(err){
        //         res.status(500).send(`Error sending mail ${err}`);
        //     }else{
        //         res.status(200).send("Email Sent");
        //     }
        // })
        User.create({name, email, password, role}, (err, data) => {
            if(err)
                res.status(500).send(err);
            else
                res.status(201).json({status: true, message: "User Created!"})
        })
    })   
}

// exports.verifyEmail = (req, res) => {
//     const token = req.body;
// }

// jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken) {
//     if(err)
//         console.log(err);
//     bcrypt.compare("passworfd", decodedToken.password, function(err, res){
//         if(err)
//             console.log(err);
//         if(res)
//             console.log(res, true);
//         else
//             console.log(false)
//     })
// })