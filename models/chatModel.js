const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({

    message: { type: String },
    sender: { type: String },
    time: { type: Date },

}, { timestamp: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
