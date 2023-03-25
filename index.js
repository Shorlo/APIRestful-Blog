/*  APIRESTFUL-BLOG/index.js
       ____     __           _           _____        __
      / __/_ __/ /  ___ ____(_)__  ___  / ___/__  ___/ /__
 --- _\ \/ // / _ \/ -_) __/ / _ `/ _ \/ /__/ _ \/ _  / -_)---------------------
|   /___/\_, /_.__/\__/_/ /_/\_,_/_//_/\___/\___/\_,_/\__/                      |
| Shorlo/___/                                                                   |
|                                                                               |
|   Copyright © 2022-2023 Javier Sainz de Baranda Goñi.                         |
|   Released under the terms of the GNU Lesser General Public License v3.       |
|                                                                               |
|   This program is free software: you can redistribute it and/or modify it     |
|   under the terms of the GNU General Public License as published by the Free  |
|   Software Foundation, either version 3 of the License, or (at your option)   |
|   any later version.                                                          |
|   This program is distributed in the hope that it will be useful, but         |
|   WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY  |
|   or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License     |
|   for more details.                                                           |
|                                                                               |
|   You should have received a copy of the GNU General Public License along     |
|   with this program. If not, see <http://www.gnu.org/licenses/>.              |
|                                                                               |
'==============================================================================*/

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


