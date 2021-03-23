const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({

    name: { type: String, required: true },
    chats: [{
        message: { type: String },
        sender: { type: String },
        time: { type: Date, default: new Date() }
    }],

}, { timestamp: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
