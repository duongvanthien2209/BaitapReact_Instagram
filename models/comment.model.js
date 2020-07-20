const mongoose = require('mongoose');
const schema = mongoose.Schema({
    _userId: String,
    _articleId: String,
    content: String
});

const Comment = mongoose.model('Comment', schema, 'comments');
module.exports = Comment;