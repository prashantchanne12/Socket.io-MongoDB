const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({

    name: { type: String, required: true },
    chats: [{
        message: { type: String },
        sender: { type: String },
        time: { type: Date, default: new Date() }
    }],
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    active_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    joined_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, { timestamp: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
