const express = require('express');
const { register, login, updateProfile } = require('../controllers/auth');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/register', (req, res, next) => {
    console.log('Handling /register request');
    next();
}, register);

router.post('/login', (req, res, next) => {
    console.log('Handling /login request');
    next();
}, login);

router.put('/profile', authMiddleware, (req, res, next) => {
    console.log('Handling /profile update request');
    next();
}, updateProfile);

module.exports = router;
