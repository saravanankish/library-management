const express = require('express');
const router = express.Router();

const { loginController } = require('../controllers/loginController');

router.post('/user/login', loginController);

module.exports = router;