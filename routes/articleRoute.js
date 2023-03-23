const express = require('express');
const router = express.Router();
const ArticleController = require('../controller/articleController');

// Routes
router.get("/test-route", ArticleController.test);
router.get("/book", ArticleController.book);

// Utils endpoints routes
router.post("/createArticle", ArticleController.createArticle);
router.get("/listArticles", ArticleController.listArticles);
// Passing opcional parameter in the url. Without the "?" will be a required parameter
router.get("/listArticlesByDate/:last?", ArticleController.listArticlesByDate);

module.exports = router;