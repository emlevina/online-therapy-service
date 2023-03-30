const express = require('express');
const cookieParser = require('cookie-parser');
const users_router = require('./routes/users');
const appointments_router = require('./routes/appointments');
const { handleErrors } = require('./middleware/handleErrors')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/appointments', appointments_router)
app.use('/', users_router)

app.use(handleErrors)

module.exports = app