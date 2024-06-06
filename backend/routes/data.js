//made by @domekisuzi at 2024/6/6:10:31
const express = require('express');
const { addData, getData } = require('../controllers/data');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/data', authMiddleware, (req, res, next) => {
    console.log('Handling /data add request');
    next();
}, addData);

router.get('/data', authMiddleware, (req, res, next) => {
    console.log('Handling /data get request');
    next();
}, getData);

module.exports = router;
