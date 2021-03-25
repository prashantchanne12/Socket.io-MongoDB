const express = require('express');
const userRouter = express.Router();

// Model
const User = require('../models/userModel');
const Room = require('../models/roomModel');


userRouter.post('/', async (req, res) => {

    try {

        const { username, password } = req.body;

        console.log(username, password)

        const userExists = await User.find({ username, password });

        if (userExists.length === 0) {
            console.log('Wrong username or password');
            return res.send({ err: 'Wrong username or password' });
        }

        res.status(200).send(userExists[0]);

    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});


userRouter.post('/signup', async (req, res) => {
    try {

        const { username, password } = req.body;

        const userExists = await User.find({ username });

        if (userExists.length > 0) {
            console.log('Username already exists');
            return res.send({ err: 'Username is already taken' });
        }

        const user = await User.create({
            username,
            password,
        });

        if (user) {
            res.status(201).send({
                _id: user._id,
                username,
            });
        }

    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

userRouter.post('/createRoom', async (req, res) => {

    try {

        const roomName = req.body.room;

        console.log(req.user);

        // check if roomName exits
        const roomExists = await Room.find({ name: roomName });

        if (roomExists.length !== 0) {
            console.log('Room already exists');
            return res.send({ err: 'Room already exists', room: roomExists[0] });
        }

        const newRoom = await Room.create({ name: roomName, chats: [] });

        if (newRoom) {
            res.status(201).send(newRoom);
        } else {
            console.log('Error while creating new room');
            res.send(400).send({ err: 'Error while creating new room' });
        }


    } catch (e) {
        console.log(e);
    }

});

module.exports = userRouter;
