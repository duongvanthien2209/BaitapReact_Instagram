const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    friends: Array
    // isAdmin: Boolean,
    // wrongLoginCount: Number
});

const User = mongoose.model('User', schema, 'users');
module.exports = User;