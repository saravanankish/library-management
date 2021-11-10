const express = require('express');
const router = express.Router();

const { adminController, getAllBooks, findBookById, bookSaveChanges, deleteBookById, getAllRequest, updateRequest } = require('../controllers/adminController');

router.post('/admin/book/new', adminController);

router.put('/admin/book/save', bookSaveChanges);

router.get('/admin/book', getAllBooks);

router.get('/admin/book/:id', findBookById);

router.delete('/admin/book/delete/:id', deleteBookById);

router.get('/admin/requests', getAllRequest);

router.put('/admin/requests/update', updateRequest);

module.exports = router;