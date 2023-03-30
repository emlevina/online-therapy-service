const connectDB = require('./config/db');
const app = require('./app')
require('dotenv').config();

const port = process.env.PORT || 3005

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