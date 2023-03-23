const validator = require('validator');
const { param } = require('../routes/articleRoute');

const test = (request, response) =>
{
    return response.status(200).json
    ({
        message: "testing article controller"
    });
}

const book = (request, response) =>
{
    console.log("Ejecuting test endpoint...");
    return response.status(200).json
    (
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
}

const createArticle = (request, response) =>
{
    // Get data to save by post
    let params = request.body;

    // Validate data
    try
    {
        let validate_title = !validator.isEmpty(params.title) && validator.isLength(params.title, {min: 5, max: 25});
        let validate_content = !validator.isEmpty(params.content);

        if(!validate_title || !validate_content)
        {
            throw new Error("Info is not validate!!");
        }
    }
    catch(error)
    {
        return response.status(400).json
        ({
            status: "error",
            message: "Missing data..."
        });
    }

    // Assign values to the model object( manual or automatic )


    // Save the item in database


    return response.status(200).json
    ({
        message: "Save action",
        params
    });
}

module.exports = { test, book, createArticle};