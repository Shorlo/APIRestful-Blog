const mongoose = require("mongoose");
 
const connection = async() =>
{
    try
    {
        await mongoose.connect("mongodb://0.0.0.0:27017/ApiRestful_blog");

        console.log("Database connected successfully!!");
    }
    catch(error)
    {
        console.log(error)
        throw new Error("Cannot connect to the database...");
    }
}

module.exports = { connection };