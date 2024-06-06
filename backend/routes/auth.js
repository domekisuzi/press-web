const express = require('express');
const { register, login, updateProfile, getProfile } = require('../controllers/auth'); // 确保正确导入
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

router.get('/profile', authMiddleware, (req, res, next) => {
    console.log('Handling /profile get request');
    next();
}, getProfile);

module.exports = router;
