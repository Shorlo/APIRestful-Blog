const express = require('express');
const router = express.Router();
const ArticleController = require('../controller/articleController');

// Router's test

router.get("/test-route", ArticleController.test);
router.get("/book", ArticleController.book);

module.exports = router;