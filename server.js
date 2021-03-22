const path = require('path');
const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running PORT ${PORT}`);
});