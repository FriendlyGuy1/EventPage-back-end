require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const uploadImage = require("./uploadImage.js");

const connectDB = require('./config/db');
connectDB();

const express = require('express'); 
const app = express(); 

app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});



app.use("/api/user", require("./routes/UserRoutes"))

app.use("/api/categories", require("./routes/CategoryRoutes"))

app.use('/api/favorites', require('./routes/FavoritesRoutes'));

app.use('/api/events', require('./routes/EventRoutes'));

app.post("/api/uploadImage", (req, res) => {
    uploadImage(req.body.image)
      .then((url) => res.send(url))
      .catch((err) => res.status(500).send(err));
});
  

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`) 
})