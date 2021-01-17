const express = require('express')
const router = express.Router()

const {
    getArticles,
    createArticle,
    getArticleById,
} = require('../controllers/article')

router.post("/", createArticle)
router.get("/", getArticles)
router.get("/:id", getArticleById)

module.exports = router