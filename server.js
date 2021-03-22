const path = require('path');
const http = require('http');
const express = require('express');
const connectDB = require('./config/db');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
// adding socket functionality to our server
const io = socketio(server);

connectDB();

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {

    // welcone current only current user / yourself
    socket.emit('message', 'welcome to Socket.io chat');

    // Broadcast when a user connects
    // Broadcast to everyone who is connected except yourself
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        // Emit to everyone including yourself
        io.emit('message', 'A user has left the chat');
    });


    // Listen for chat message
    socket.on('chatMessage', (msg) => {

        // Emitting message to all connected clients
        io.emit('message', msg);

    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running PORT ${PORT}`);
});