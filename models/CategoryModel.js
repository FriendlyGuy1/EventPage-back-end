const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
    category: { 
        type: String, 
        required: true,
        unique: true,
    },
    createAt: { 
        type: Date, 
        default: Date.now
    },  
}))

module.exports = Category; 