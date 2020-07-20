const express = require('express');
const router = express.Router();

// Middleware
const authMiddleware = require('../api/middlewares/auth.middleware');

// Routes
const authRoute = require('../api/routes/auth.route');
const articleRoute = require('../api/routes/article.route');
const userRoute = require('../api/routes/user.route');
const commentRoute = require('../api/routes/comment.route');

router.use('/auth', authRoute);

router.use(authMiddleware.checkToken);

router.use('/article', articleRoute);

router.use('/user', userRoute);

router.use('/comment', commentRoute);

module.exports = router;