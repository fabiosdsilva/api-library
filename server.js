// Express
const express = require('express');
const app = express();

// Routes
const apiRouter = require('./src/routes/books');

// Middleware
app.use(express.json());
app.use('/', apiRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});