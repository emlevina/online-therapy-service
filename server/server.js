const express = require('express');
const connectDB = require('./config/db');
const users_router = require('./routes/users')

const app = express();
require('dotenv').config();

const port = process.env.PORT || 3005

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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