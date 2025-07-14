const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomCode: { type: String, required: true, unique: true },
    createdBy: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rooms', roomSchema);
