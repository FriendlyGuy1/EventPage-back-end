require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const express = require('express'); 
const app = express(); 
app.use(express.json());


const {
    registerUser,
} = require('./controllers/UserController');

app.post('/api/user', registerUser);



app.use("/api/categories", require("./routes/CategoryRoutes"))

app.use('/api/events', require('./routes/EventRoutes'));



app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`) 
})