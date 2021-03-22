const path = require('path');
const express = require('express');

const app = express();

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running PORT ${PORT}`);
});