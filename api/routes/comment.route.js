const express = require('express');
const router = express.Router();

// Controllers
const commentController = require('../controllers/comment.controller');

router.get('/article/:id', commentController.getCommentFromArticle);

router.post('/:articleId/:userId', commentController.postComment);

module.exports = router;