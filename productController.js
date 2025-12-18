const Product = require('../models/Product');

exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId) next();
    else res.redirect('/auth/login');
};

exports.index = async (req, res) => {
    const search = req.query.search || '';
    const products = await Product.find({ name: { $regex: search, $options: "i" } });
    res.render('products/index', { products, search });
};

exports.new = (req, res) => {
    res.render('products/new');
};

exports.create = async (req, res) => {
    await Product.create(req.body);
    res.redirect('/products');
};

exports.show = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/show', { product });
};

exports.edit = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product });
};

exports.update = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
};

exports.delete = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};
