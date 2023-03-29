const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const users_router = require('./routes/users');
const appointments_router = require('./routes/appointments');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 3005

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/appointments', appointments_router)
app.use('/', users_router)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(`Connected to Mongo Cluster`)
        app.listen(port, () => {
            console.log(`Server runs on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()