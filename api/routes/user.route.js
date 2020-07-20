const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/user.controller');

router.get('/', userController.getIndex);

module.exports = router;