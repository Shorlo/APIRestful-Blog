const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');
const { request, response } = require('express');

console.log("Starting APIRestful-Blog... ");

// Connect to the database
connection();

// Create Node server
const app = express();
const PORT = 3900;

// Config cors
app.use(cors());

// Convert body to ObjectJS
app.use(express.json()); // get data with content-type app/json
app.use(express.urlencoded({extended: true})); // get data with form-urlencoded

// Routes
const articleRoute = require('./routes/articleRoute');

// Load routes
app.use("/api", articleRoute);


// Create routes
app.listen(PORT, () =>
{
    console.log(`Server running at Port: ${PORT}`);
});


