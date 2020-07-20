// Models
const User = require('../../models/user.model');
const { json } = require('body-parser');

module.exports.getIndex = async (req,res) => {
    let user = res.locals.user;

    let users = await User.find({});

    // users = users.filter(item => {
    //     for(let userId of user.friends) {
    //         if(item._id === userId) return false;
    //     }
    // }).limit(5);

    res.json({ users, success: true });
}