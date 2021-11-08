const express = require('express');
const router = express.Router();

const { userController } = require('../controllers/userController');

router.get('/user/get/:id', userController);

module.exports = router;