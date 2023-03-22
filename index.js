const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');

console.log("Starting APIRestful-Blog... ");

// Connect to the database
connection();

// Create Node server
const app = express();
const PORT = 3900;

// Config cors
app.use(cors());

// Convert body to ObjectJS
app.use(express.json());

// Create routes
app.listen(PORT, () =>
{
    console.log(`Server running at Port: ${PORT}`);
});
