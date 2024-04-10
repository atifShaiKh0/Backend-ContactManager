require('dotenv').config();
const express = require('express');
const connectDB = require("./config/dbConnection");
// const router = require("./routes/userRoutes")
connectDB();
const app = express();


const port = 2000;

// Middleware
app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(2000, () => {
    console.log(`App Listening on port ${port}`);
})