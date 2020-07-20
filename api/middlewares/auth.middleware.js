require('dotenv').config();
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const User = require('../../models/user.model');

module.exports.checkToken = async (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;
    
    let decode;
    try {
        decode = jwt.verify(token, process.env.PRIVATEKEY);   
    } catch (error) {
        res.json({ success: false, message: 'Token không hợp lệ' });
        return;
    }

    let user;
    try {
        user = await User.findById(decode.id);   
    } catch (error) {
        res.json({ success: false, message: 'User không tồn tại' });
        return;
    }

    res.locals.user = user;

    next();
}