const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const appointmentsRouter = require('./routes/appointments');
const themesRouter = require('./routes/themes');
const methodsRouter = require('./routes/methods');
const therapistDetailsRouter = require('./routes/therapistDetails');
const messagesRouter = require('./routes/messages');
const convosRouter = require('./routes/conversations');
const { handleErrors } = require('./middleware/handleErrors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.use('/api/appointments', appointmentsRouter);
app.use('/api/themes', themesRouter);
app.use('/api/methods', methodsRouter);
app.use('/api/therapistdetails', therapistDetailsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/conversations', convosRouter);
app.use('/api/', usersRouter);

app.use(handleErrors)

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
// });

module.exports = app