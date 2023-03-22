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
app.use(express.json());

// Routes
app.get("/", (request, response) =>
{
    console.log("Ejecuting test endpoint...");
    return response.status(200).send(`
        <h1>APIRestful with NodeJS</h1>
    `);
});
app.get("/test", (request, response) =>
{
    console.log("Ejecuting test endpoint...");
    return response.status(200).json(
        [
            {
                title: "APIRestful NodeJS",
                author: "Javier Sainz de Baranda",
            },
            {
                title: "Fundaments of Object-C",
                author: "Javier Sainz de Baranda",
            }
        ]
    );
});

// Create routes
app.listen(PORT, () =>
{
    console.log(`Server running at Port: ${PORT}`);
});


