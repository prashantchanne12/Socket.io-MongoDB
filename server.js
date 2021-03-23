const axios = require('axios');
const path = require('path');
const http = require('http');
const express = require('express');
const connectDB = require('./config/db');
const socketio = require('socket.io');

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, getRoomsUser, userLeave } = require('./utils/users');

// Routes
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
// adding socket functionality to our server
const io = socketio(server);

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

const botName = 'Socket.io bot';

// Run when client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // welcome current only current user / yourself
        socket.emit('message', formatMessage(botName, 'welcome to Socket.io chat'));

        // Broadcast when a user connects
        // Broadcast to everyone who is connected except yourself
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomsUser(user.room)
        });


        socket.emit('fetchChats', {
            room: user.room
        });
    });

    // Listen for chat message
    socket.on('chatMessage', async (msg) => {

        const user = getCurrentUser(socket.id);

        // Emitting message to all connected clients
        io.to(user.room).emit('message', formatMessage(user.username, msg));

        await axios.post('http://localhost:3000/api/chats/', {
            name: user.room,
            username: user.username,
            message: msg,
        });

    });

    // Runs when client disconnects
    socket.on('disconnect', () => {

        const user = userLeave(socket.id);

        if (user) {
            // Emit to everyone including yourself
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomsUser(user.room)
            });
        }
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running PORT ${PORT}`);
});