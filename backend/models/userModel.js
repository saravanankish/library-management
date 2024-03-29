const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    request: {
        type: Array
    },
    books: {
        type: Array,
    },
    fine: {
        type: Number,
        default: 0
    }
    // email_verified: {
    //     type: Boolean,
    //     required: true
    // }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);