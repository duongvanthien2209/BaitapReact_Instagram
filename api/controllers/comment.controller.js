// Models
const Comment = require('../../models/comment.model');
const User = require('../../models/user.model');

module.exports.getCommentFromArticle = async (req, res) => {
    let { id } = req.params;
    let result = { success: true };

    let comments = [];
    try {
        comments = await Comment.find({ _articleId: id });
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }

    let newComments = [];

    for(let item of comments) {
        let { content } = item;
        let user = await User.findById(item._userId);
        newComments.push({ content, userName: user.name });
    }

    result.comments = newComments;

    res.json(result);
}

module.exports.postComment = async (req,res) => {
    let { articleId, userId } = req.params;
    let { comment } = req.body;
    let result = { success: true };

    try {
        let newComment = new Comment({ _articleId: articleId, _userId: userId, content: comment });
        await newComment.save();
    } catch (error) {
        result.success = false;
    }

    res.json(result);
}