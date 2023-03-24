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