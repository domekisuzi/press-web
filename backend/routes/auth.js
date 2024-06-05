const express = require('express');
const { register, login, authMiddleware } = require('../controllers/auth');
const router = express.Router();

router.post('/register', (req, res, next) => {
    console.log('Handling /register request');
    next();
}, register);

router.post('/login', (req, res, next) => {
    console.log('Handling /login request');
    next();
}, login);

module.exports = router;
