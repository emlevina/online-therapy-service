const connectDB = require('./config/db');
const app = require('./app')
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const port = process.env.PORT || 3005

const server = http.createServer(app);
// SOCKET IO
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});


io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('choose_convers', (data) => {
        // console.log('choose_convers', data)
        const { currentUser, currConvo } = data
        // socket.join(currConvo._id)
    });
    

    socket.on('send_message', (data) => {
        // console.log("send_message", data)
        const { currConvo, value, currentUser } = data
        let __createdtime__ = Date.now();

        io.to(currConvo._id).emit('receive_message', {
            conversationId: currConvo._id,
            sender: currentUser,
            message: value,
            __createdtime__,
        })
    })
});


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(`Connected to Mongo Cluster`)
        server.listen(port, () => {
            console.log(`Server runs on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()