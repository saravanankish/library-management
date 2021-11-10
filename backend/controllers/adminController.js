const Book = require('../models/bookModel');
const Requests = require('../models/requestsModel');

exports.adminController = (req, res) => {
    const BookDetails = req.body;
    Book.create(BookDetails, (err, data) => {
        if(err) 
            return res.status(200).send(err);
        res.status(201).send(data)
    })
}

exports.bookSaveChanges = (req, res) => {
    const bookData = req.body;
    Book.updateOne({_id: bookData.id}, bookData, (err, data) => {
        if(err)
            return res.status(500).send(err);
        return res.status(200).send(data)
    })
}

exports.getAllBooks = (req, res) => {
    Book.find({}, (err, data) => {
        if(err)
            return res.status(200).send(err);
        res.status(200).send(data);
    })
}

exports.findBookById = (req, res) => {
    const _id = req.params.id;
    Book.findOne({_id}, (err, data) => {
        if(err)
            return res.status(200).send(err);
        return res.status(200).send(data);
    })
}

exports.getAllRequest = (req, res) => {
    Requests.find({}).sort({createdAt: -1}).exec((err, data) => {
        if(err)
            return res.status(500).send(err);
        return res.status(200).send(data);
    });
}


exports.deleteBookById = (req, res) => {
    const id = req.params.id;
    Book.findByIdAndDelete(id, (err, data) => {
        if(err)
            return res.status(500).send(err);
        return res.status(200).send({status: true, data: data});
    })
}

exports.updateRequest = (req, res) => {
    const reqData = req.body;
    Requests.findByIdAndUpdate(reqData._id, reqData, (err, data) => {
        if(err)
            return res.status(500).send(err);
        return res.status(201).send({status: true, data:data});
    })
}