const express = require('express');
const userRouter = express.Router();

// Model
const User = require('../models/userModel');

userRouter.post('/', async (req, res) => {

    try {

        const { username } = req.body;

        const userExists = await User.find({ username });

        if (userExists.length > 0) {
            console.log('Username already exists');
            return res.send({ err: 'Username is already taken' });
        }

        const user = await User.create({
            username,
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

module.exports = userRouter;
