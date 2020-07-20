const express = require('express');
const router = express.Router();

// Multer
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' });

// Controllers
const articleController = require('../controllers/article.controller');

router.get('/', articleController.getIndex);

router.post('/', upload.single('image'), articleController.postIndex);

router.get('/:articleId/like/:userId', articleController.getLike);

module.exports = router;