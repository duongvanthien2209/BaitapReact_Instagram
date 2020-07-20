require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

// Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODBURL);

// Body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tạo file public
app.use(express.static('public'));

// Routes
const apiRoute = require('./routes/api.route');

app.use('/api', apiRoute);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));