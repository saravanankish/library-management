const express = require('express');
const router = express.Router();

const { getAllBooks } = require('../controllers/adminController');
const { userController, requestBook, getRequestById, getBookById, getRequestByUserId, deleteRequestById } = require('../controllers/userController');


router.get('/user/get/:id', userController);

router.get('/user/book', getAllBooks);

router.get('/user/book/:id', getBookById);

router.post('/user/request/new', requestBook);

// router.get('/user/request', getAllRequest);

router.get('/user/request', getRequestByUserId);

router.delete('/user/request/delete/:id', deleteRequestById);

module.exports = router;