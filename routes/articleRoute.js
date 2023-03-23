const express = require('express');
const router = express.Router();
const ArticleController = require('../controller/articleController');

// Routes
router.get("/test-route", ArticleController.test);
router.get("/book", ArticleController.book);

// Utils routes
router.post("/createArticle", ArticleController.createArticle);

module.exports = router;