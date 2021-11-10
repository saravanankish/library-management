const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requests: {
        type: Array,
    },
    users: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model('book', BookSchema);