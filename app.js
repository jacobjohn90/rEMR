require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('Mongoose Connected Successfully')
});
connection.on('error', (err) => {
    console.log('Mongoose could not Connected: ' + err);
})


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/client/build/'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
