const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

const port = process.env.PORT || 3005

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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