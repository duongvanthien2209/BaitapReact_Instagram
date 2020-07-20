const mongoose = require('mongoose');
const schema = mongoose.Schema({
    status: String,
    image: String,
    tgianTao: Date,
    like: Array,
    _userId: String
});

const Article = mongoose.model('Article', schema, 'articles');
module.exports = Article;