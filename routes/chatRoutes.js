const express = require('express');
const chatRouter = express.Router();

// Model
const Room = require('../models/roomModel');
const User = require('../models/userModel');

chatRouter.post('/', async (req, res) => {

    try {

        const { name, username, message } = req.body;

        const room = await Room.findOne({ name });

        const data = {
            message: message,
            sender: username,
        }

        if (room) {
            // if room exists
            room.chats = [...room.chats, data];

            const newRoom = await room.save();

            if (newRoom) {
                res.status(200).send(newRoom);
            } else {
                console.log('Error while adding chats to room');
                res.status(400).send({ err: 'Error while adding chats to room' })
            }
        } else {
            // if room doesn't exist
            // create new room

            const newRoom = await Room.create({
                name,
                chats: [data]
            });

            if (newRoom) {
                res.status(201).send(newRoom);
            } else {
                console.log('Error while creating new room')
                res.status(400).send({ err: 'Error while creating new room' })
            }
        }

    } catch (e) {
        console.log(e);
        res.status(400).send(e);

    }

});

chatRouter.get('/', async (req, res) => {

    try {

        const name = req.query.room;
        const room = await Room.findOne({ name });

        if (room) {
            res.send(room.chats);
        } else {
            // console.log('Room not found!');
            res.status(400).send('Room not found!');
        }

    } catch (e) {
        console.log(e);
        res.status(400).send(e);

    }

});

chatRouter.post('/leaveRoom', async (req, res) => {

    try {

        const { roomName, username } = req.body;
        let userId;

        // get user
        const user = await User.findOne({ username: username });

        if (user) {
            userId = user._id;
        } else {
            console.log('User not found');
            res.status(400).send('User not found!');
        }

        const room = await Room.findOne({ name: roomName });

        if (!room) {
            console.log('Room not found');
            return res.status(400).send('Room not found');
        }

        // room.active_users = room.active_users.filter(user => user != userId);
        let active_users = [];

        room.active_users.forEach(user => {
            if (!user.equals(userId)) {
                active_users.push(user);
            }
        });

        room.active_users = active_users;

        const updatedRoom = await room.save();

        if (updatedRoom) {
            res.send(updatedRoom);
        } else {
            res.status(400).send('Error while updating room');
        }


    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});

module.exports = chatRouter;