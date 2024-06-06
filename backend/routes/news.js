//made by @domekisuzi at 2024/6/6:22:43
const express = require('express');
const { getNews } = require('../controllers/news');
const router = express.Router();

router.get('/news', getNews);

module.exports = router;
