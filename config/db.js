const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect to MongoDB ${conn.connection.host}`)
    } catch (error) {
        console.log('Nepavyko prisijungti ', error)
    }
}
module.exports = connectDB;