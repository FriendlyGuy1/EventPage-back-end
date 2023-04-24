const mongoose = require('mongoose');

const Event = mongoose.model('User', new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    }, 
    email: { 
        type: String, 
        required: true,
        unique: true
    }, 
    password: { 
        type: String, 
        required: true
    }, 
    role: {
        type: String,
        default: "User"
    },
},   
    {
        timestamps: true
    }
))

module.exports = Event; 