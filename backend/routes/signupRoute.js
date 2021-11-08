const express = require('express');
const router = express.Router();

const { signupController } = require('../controllers/signupController');

router.post('/user/new', signupController);

module.exports = router;