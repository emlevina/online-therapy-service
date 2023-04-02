const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const appointmentsRouter = require('./routes/appointments');
const themesRouter = require('./routes/themes');
const methodsRouter = require('./routes/methods');
const therapistDetailsRouter = require('./routes/therapistDetails');
const { handleErrors } = require('./middleware/handleErrors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/appointments', appointmentsRouter)
app.use('/themes', themesRouter)
app.use('/methods', methodsRouter)
app.use('/therapistdetails', therapistDetailsRouter)
app.use('/', usersRouter)

app.use(handleErrors)

module.exports = app