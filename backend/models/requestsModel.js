const mongoose = require("mongoose");

const RequestsSchema = mongoose.Schema({
    requestType: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('requests', RequestsSchema);