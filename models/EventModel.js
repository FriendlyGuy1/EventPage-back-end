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
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createAt: { 
        type: Date, 
        default: Date.now
    }, 
}))

module.exports = Event; 