const validator = require('validator');
const Article = require('../model/Article');

// Test
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

// Endpoint
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

    // Create and assign values to the model object( manual or automatic )
    const article = new Article(params);

    // Save the item in database
    // MongooseError Model.prototype.save() no longer accepts a callback
    /*
    article.save((error, articleSaved) => 
    {
        if(error || !articleSaved)
        {
            return response.status(400).json
            ({
                status: "error",
                message: "Article was not saved..."
            });
        }
        
        return response.status(200).json
        ({
            status: "Success",
            article: articleSaved,
            message: "Article was saved successfully!!"
        });
    });
    */

    // New way to save intem in database using Mongoose without callbacks
    article.save().then((articleSaved) =>
    {
        return response.status(200).json
        ({
            status: "Success",
            article: articleSaved,
            message: "Article was saved successfully!!"
        });
    }).catch((error) =>
    {
        console.error(error);
        return response.status(400).json
        ({
            status: "error",
            message: "Article was not saved..."
        });
    });

}

module.exports = { test, book, createArticle };