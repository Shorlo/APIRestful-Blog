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

    // New way to save item in database using Mongoose without callbacks
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
        return response.status(400).json
        ({
            status: "error",
            error: error,
            message: "Article was not saved..."
        });
    });
}

const listArticles = (resquest, response) =>
{
    // List articles from the database.
    //MongooseError: Query.prototype.exec() no longer accepts a callback
    /*
    let query = Article.find({}).exec((error, articles) => 
    {
        if(error || !articles)
        {
            return response.status(404).json
            ({
                status: "error",
                message: "Articles not found..."
            });
        }

        return response.status(200).send
        ({
            status: "Success",
            articles
        });
    });
    */

    // New way to list items in database using Mongoose without callbacks
    let query = Article.find({}).then((articles) =>
    {
        return response.status(200).send
        ({
            status: "Success",
            articles: articles
        });
    }).catch((error) =>
    {
        return response.status(404).json
        ({
            status: "Error",
            error: error,
            message: "Articles not found..."
        });
    });
}

const listArticlesByDate = (resquest, response) =>
{
    let query = Article.find({});
    
    // With limit we only get the first 3 register in the database
    //query.limit(3);
    // We will limit the query by first 3 items if we recieve the last parameter in the url
    if(resquest.params.last)
    {
        query.limit(3);
    }

    // With sort and date: -1 we order the list by the recent articles first
    query.sort({date: -1}).then((articles) =>
    {
        return response.status(200).send
        ({
            status: "Success",
            articles: articles
        });
    }).catch((error) =>
    {
        return response.status(404).json
        ({
            status: "Error",
            error: error,
            message: "Articles not found..."
        });
    });
}

const getArticle = (request, response) =>
{
    // Get id of url
    let id = request.params.id;

    // Find article
    // MongooseError: Model.findById() no longer accepts a callback
    /*
    Article.findById(id, (error, article) =>
    {
        // If not exists -> error
        if(error || !article)
        {
            return response.status(404).json
            ({
                status: "Error",
                message: "Article not found..."
            });
        }
        // Return response
        return response.status(200).json
        ({
            status: "Success",
            article: article
        });
    });
    */
    
    // New way to get item by id in database using Mongoose without callbacks
    Article.findById(id).then((article) =>
    {
        return response.status(200).json
        ({
            status: "Success",
            article: article
        });
    }).catch((error) =>
    {
        return response.status(404).json
        ({
            status: "Error",
            error: error,
            message: "Article not found..."
        });
    });
}

const deleteArticle = (request, response) =>
{
    let idArticle = request.params.id;

    Article.findOneAndDelete({_id: idArticle}).then((article) =>
    {
        return response.status(200).json
        ({
            status: "Success",
            article: article,
            message: "Article was deleted..."
        });
    }).catch((error) =>
    {
        return response.status(500).json
        ({
            status: "Error",
            error: error,
            message: "Article not found..."
        });
    });
}

module.exports =
{
    test,
    book,
    createArticle,
    listArticles,
    listArticlesByDate,
    getArticle,
    deleteArticle
};