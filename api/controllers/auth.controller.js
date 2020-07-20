require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../../models/user.model');
const { use } = require('../routes/auth.route');

module.exports.postSignUp = async (req,res) => {
    let { email, name, password } = req.body;

    if(!email || !name || !password) {
        res.json({ success: false, message: 'Có lỗi xảy ra' });
        return;
    }

    let hash = await bcrypt.hash(password, 10);

    let user = new User({ email, name, password: hash });
    await user.save();

    res.json({ success: true });
}

module.exports.postLogin = async (req,res) => {
    let { email, password } = req.body;

    if(!email || !password) {
        res.json({ success: false, message: 'Có lỗi xảy ra' });
        return;
    }

    let user = await User.findOne({ email });

    if(!user) {
        res.json({ success: false, message: 'Người dùng không tồn tại' });
        return;
    }

    let result = await bcrypt.compare(password, user.password);

    if(!result) {
        res.json({ success: false, message: 'Bạn nhập sai mật khẩu' });
        return;
    }

    let id = user._id;

    let token = jwt.sign({ id }, process.env.PRIVATEKEY);

    res.json({ success: true, token });
}