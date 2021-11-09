const User = require('../models/userModel');

exports.userController = (req, res) => {
    const _id = req.params.id
    User.findOne({_id}).exec((err, data) => {
        if(err)
            return res.status(500).send("Internal Server error!");
        return res.status(200).send(data);
    })
}