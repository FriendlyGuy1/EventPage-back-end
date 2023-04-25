const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
    category: { 
        type: String, 
        required: true
    }, 
}))

module.exports = Category; 