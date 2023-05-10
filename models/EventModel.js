const mongoose = require('mongoose');

const Event = mongoose.model('Event', new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    }, 
    description: { 
        type: String, 
        required: true
    }, 
    category: { 
        type: String, 
        required: true
    }, 
    place: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    favorites: {
        type: Number,
        default: 0
    },
    approved: {
        type: Boolean,
        default: false
    },
    createAt: { 
        type: Date, 
        default: Date.now
    }, 
}))

module.exports = Event; 