
// Models
const Article = require('../../models/article.model');
const { use } = require('../routes/auth.route');
const { json } = require('body-parser');
const fs = require('fs');
const User = require('../../models/user.model');

module.exports.getIndex = async (req,res) => {
    let { user } = res.locals;
    
    let articles;
    try {
        articles = await Article.find({ _userId: user._id });
    } catch (error) {
        articles = [];
        res.json({ success: false, articles, user });
        return;
    }

    res.json({ success: true, articles, user });
}

module.exports.postIndex = async(req,res) => {
    let file = req.file;
    let { content, userId } = req.body;
    
    if(!file || !content || !userId) {
        res.json({ success: false });
        return;
    }

    let orgName = file.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = file.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);

    let image = newFullPath.split('\\');
    image.splice(0,1);
    image = 'http://localhost:5000/' + image.join('/');

    let article = new Article({
        status: content,
        image,
        tgianTao: new Date(),
        like: [],
        _userId: userId
    });

    try {
        await article.save();
    } catch (error) {
        res.json({ success: false });
        return;
    }
    res.json({ success: true });
}

module.exports.getLike = async (req,res) => {
    let { userId, articleId } = req.params;
    let result = { success: true };
    
    let article = null;
    try {
        article = await Article.findById(articleId);
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }

    if(!article) {
        result.success = false;
        res.json(result);
        return;
    }

    let isTrue = false;
    article.like.forEach((item,index) => {
        if(item === userId) {
            isTrue = true;
            article.splice(index,1);
        }
    });

    if(!isTrue) {
        article.like.push(userId);
    }

    try {
        await article.save();
    } catch (error) {
        result.success = false;
        res.json(result);
        return;
    }
    res.json(result);
}