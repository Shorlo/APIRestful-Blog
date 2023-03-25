/*  APIRESTFUL-BLOG/articleController.js
       ____     __           _           _____        __
      / __/_ __/ /  ___ ____(_)__  ___  / ___/__  ___/ /__
 --- _\ \/ // / _ \/ -_) __/ / _ `/ _ \/ /__/ _ \/ _  / -_)---------------------
|   /___/\_, /_.__/\__/_/ /_/\_,_/_//_/\___/\___/\_,_/\__/                      |
|       /___/                                                                   |
|                                                                               |
|   Copyright © 2022-2023 Javier Sainz de Baranda Goñi.                         |
|   Released under the terms of the GNU Lesser General Public License v3.       |
|                                                                               |
|   This program is free software: you can redistribute it and/or modify it     |
|   under the terms of the GNU General Public License as published by the Free  |
|   Software Foundation, either version 3 of the License, or (at your option)   |
|   any later version.                                                          |
|  This program is distributed in the hope that it will be useful, but          |
|  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY   |
|  or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License      |
|  for more details.                                                            |
|                                                                               |
|  You should have received a copy of the GNU General Public License along      |
|  with this program. If not, see <http://www.gnu.org/licenses/>.               |
|                                                                               |
'==============================================================================*/

const { response } = require('express');
const fs = require('fs');
const path = require('path');
const { request } = require('http');
const { resolve } = require('path');
const { validateArticle } = require('../helpers/validate');
const { exists } = require('../model/Article');
const Article = require('../model/Article');

// Endpoints
const createArticle = (request, response) =>
{
    // Get data to save by post
    let params = request.body;

    // Validate data
    try
    {
        validateArticle(params);
    }
    catch
    (error)
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
    // Get id of article what we want to delete
    let idArticle = request.params.id;

    // Find the article and delete from the database
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

const editArticle = (request, response) =>
{
    // Get id of the article to edit
    let idArticle = request.params.id;

    // Get data from the body
    let params = request.body;

     // Validate data
     try
     {
         validateArticle(params);
     }
     catch(error)
     {
         return response.status(400).json
         ({
             status: "Error",
             message: "Missing data..."
         });
     }
    
    // Find, update article and return response
    Article.findOneAndUpdate({_id: idArticle}, params, {new: true}).then((articleUpdate) =>
    {
        return response.status(200).json
        ({
            status: "Success",
            article: articleUpdate
        });
    }).catch((error) =>
    {
        return response.status(400).json
        ({
            status: "error",
            error: error,
            message: "Error updating article..."
        });
    });
}

const uploadImages =  (request, response) =>
{
    //Config multer for upload files in articleRoute.js
    // Get the file to upload and check if there is a file to upload
    if(!request.file && !request.files)
    {
        return response.status(404).json
        ({
            status: "Error",
            message: "There is no file to upload..."
        });
    }

    // Get file name
    let fileName = request.file.originalname;

    // Get file extension
    let extensionFile  = fileName.split('.')[1];
    // Check correct extension
    if(extensionFile != 'png' && extensionFile != 'jpeg' && extensionFile != 'jpg' && extensionFile != 'gif' && extensionFile != 'PNG' && extensionFile != 'JPEG' && extensionFile != 'JPG' && extensionFile != 'GIF')
    {
        // Delete file and return response.
        fs.unlink(request.file.path, (error) =>
        {
            return response.status(400).json
            ({
                status: "Error",
                error: error,
                message: "The file is not a image..."
            });
        });
    }
    else
    {
        // OK -> Update the article
        // Get id of the article to edit
        let idArticle = request.params.id;
        
        // Find, update article and return response
        Article.findOneAndUpdate({_id: idArticle}, {image: request.file.filename}, {new: true}).then((articleUpdate) =>
        {
            return response.status(200).json
            ({
                status: "Success",
                article: articleUpdate,
                file: request.file
            });
        }).catch((error) =>
        {
            return response.status(400).json
            ({
                status: "error",
                error: error,
                message: "Error updating article..."
            });
        });
    }
}

const getImage = (request, response) =>
{
    let file = request.params.file;
    let pathFile = "./images/articles/"+file;

    fs.stat(pathFile, (error, exists) =>
    {
        if(exists)
        {
            return response.sendFile(path.resolve(pathFile));
        }
        else
        {
            return response.status(404).json
            ({
                status: "Error",
                message: "Image doesn't exist...",
                error: error
            });
        }
    });
}

const search = (request, response) =>
{
    // Get string to find
    let search = request.params.search;
    // Find OR
    let query = Article.find
    ({
        "$or": 
        [
            {"title": {"$regex": search, "$options": "i"}}, // option -> i (means the field includes the search)
            {"contect": {"$regex": search, "$options": "i"}}
        ]
    });

    // Order and return response
    query.sort({date: -1}).then((articles) =>
    {
        if(articles.length <= 0)
        {
            return response.status(404).json
        ({
            status: "Error",
            message: "Articles not found..."
        });
        }
        else
        {
            return response.status(200).send
            ({
                status: "Success",
                articles: articles
            });
        } 
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

module.exports =
{
    createArticle,
    listArticles,
    listArticlesByDate,
    getArticle,
    deleteArticle,
    editArticle,
    uploadImages,
    getImage,
    search
};