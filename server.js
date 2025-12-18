require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/products');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
