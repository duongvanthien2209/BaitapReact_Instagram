const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.postSignUp);

router.post('/login', authController.postLogin);

module.exports = router;
