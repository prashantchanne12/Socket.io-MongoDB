const express = require('express');
const userRouter = express.Router();

// Model
const User = require('../models/userModel');

userRouter.post('/', async (req, res) => {

    try {

        const { username, room } = req.body;

        if (!room || !username) {
            return res.status(400).send({ err: 'Invalid data' });
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).send({ err: 'Username is already taken' });
        }

        const user = await User.create({
            username,
            room
        });

        if (user) {

            res.status(201).send({
                _id: user._id,
                username,
                room,
            });

        }


    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }

});

module.exports = userRouter;
