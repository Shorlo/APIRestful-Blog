/*  APIRESTFUL-BLOG/articleRoute.js
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
|   This program is distributed in the hope that it will be useful, but         |
|   WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY  |
|   or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License     |
|   for more details.                                                           |
|                                                                               |
|   You should have received a copy of the GNU General Public License along     |
|   with this program. If not, see <http://www.gnu.org/licenses/>.              |
|                                                                               |
'==============================================================================*/

const express = require('express');
const multer = require('multer');
const ArticleController = require('../controller/articleController');
const router = express.Router();

// Config multer destinationPATH and File name
const storage = multer.diskStorage
({
    destination: function(request, file, cb)
    {
        cb(null, './images/articles/');
    },
    filename: function(request, file, cb)
    {
        cb(null, `article-${Date.now()}-${file.originalname}`);
    }
});
const uploads = multer({storage: storage});

// Routes
// Utils endpoints routes
router.post("/createArticle", ArticleController.createArticle);
router.get("/listArticles", ArticleController.listArticles);

// Passing opcional parameter in the url. Without the "?" will be a required parameter
router.get("/listArticlesByDate/:last?", ArticleController.listArticlesByDate);
router.get("/getArticle/:id", ArticleController.getArticle);
router.delete("/getArticle/:id", ArticleController.deleteArticle);
router.put("/getArticle/:id", ArticleController.editArticle);

// Upload files
router.post("/upload-image/:id", uploads.single("file"), ArticleController.uploadImages);

// Get files
router.get("/getImage/:file", ArticleController.getImage);

// Search
router.get("/search/:search", ArticleController.search);

module.exports = router;