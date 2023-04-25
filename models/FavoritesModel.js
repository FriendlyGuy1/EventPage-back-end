const mongoose = require('mongoose');

const Favorite = mongoose.model('Favorite', new mongoose.Schema({
    userID: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    }, 
    eventID: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "Event"
    },
    createAt: { 
        type: Date, 
        default: Date.now
    }, 
}))

module.exports = Favorite; 