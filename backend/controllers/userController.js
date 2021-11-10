const User = require('../models/userModel');
const Requests = require('../models/requestsModel');
const Book = require("../models/bookModel");

exports.userController = (req, res) => {
    const _id = req.params.id
    User.findOne({_id}).exec((err, data) => {
        if(err)
            return res.status(500).send("Internal Server error!");
        return res.status(200).send(data);
    })
}

exports.getBookById = (req, res) => {
    const id = req.params.id;
    Book.findById(id, (err, book) => {
        if(err)
            return res.status(500).send(err);
        return res.status(200).send(book);
    })
}

exports.requestBook = (req, res) => {
    const requestData = req.body;
    Requests.create(requestData, (err, request) => {
        if(err)
            return res.status(500).send(err);
        User.findOne({_id: request.userId}, (err, user) => {
            if(err)
                return res.status(500).send(err);
            user.request.push("" + request._id);
            User.findByIdAndUpdate(user._id, user, (err, userData) => {
                if(err) 
                    return res.status(500).send(err);
            })
        });
        Book.findOne({_id: request.bookId}, (err, book) => {
            if(err)
                return res.status(500).send(err);
            book.requests.push("" + request._id );
            Book.findByIdAndUpdate(book._id, book, (err, bookData) => {
                if(err)
                    return res.status(500).send(err);
            });
        })
        return res.status(201).send({status: true, data: request});
    })
}

exports.getRequestByUserId = (req, res) => {
    const userId = req.query.userId;
    Requests.find({userId: userId}).sort({createdAt: -1}).exec((err, data) => {
        if(err)
            return res.status(500).send(err)
        return res.status(200).send(data);
    })
}

exports.getRequestById = (req, res) => {
    const id = req.params.id;
    Requests.findById(id, (err, data) => {
        if(err)
            return res.status(500).send(err);
        return res.status(200).send(data);
    })
}

exports.deleteRequestById = (req, res) => {
    const id = req.params.id;
    Requests.findByIdAndDelete(id, (err, request) => {
        if(err)
            return res.status(500).send(err)
        User.findOne({_id: request.userId}, (err, user) => {
            if(err)
                return res.status(500).send(err);
            user.request = user.request.filter(ele => ele !== "" + request._id);
            User.findByIdAndUpdate(user._id, user, (err, data) => {
                if(err)
                    return res.status(500).send(err);
            })
        })
        Book.findOne({_id: request.bookId}, (err, book) => {
            if(err) 
                return res.status(500).send(err);
            book.requests = book.requests.filter(ele => ele + "" !== "" + request._id)
            Book.findByIdAndUpdate(book._id, book, (err, data) => {
                if(err)
                    return res.status(500).send(err);
            })
        })
        return res.status(200).send(request);
    })
}