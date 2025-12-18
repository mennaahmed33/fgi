const User = require('../models/User');

exports.getRegister = (req, res) => {
    res.render('auth/register');
};

exports.postRegister = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.redirect('/auth/login');
    } catch (err) {
        res.send(err);
    }
};

exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.postLogin = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await user.comparePassword(req.body.password)) {
        req.session.userId = user._id;
        res.redirect('/products');
    } else {
        res.send('Invalid credentials');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};
