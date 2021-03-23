const express = require('express');
const userRouter = express.Router();

// Model
const User = require('../models/userModel');

userRouter.post('/', async (req, res) => {

    try {

        const { username, password } = req.body;

        console.log(username, password)

        const userExists = await User.find({ username, password });

        if (userExists.length === 0) {
            console.log('Wrong username or password');
            return res.send({ err: 'Wrong username or password' });
        }

        req.user = userExists[0];
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

module.exports = userRouter;
