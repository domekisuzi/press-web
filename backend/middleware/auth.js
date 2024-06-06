//made by @domekisuzi at 2024/6/6:10:34

const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.error('No token provided');
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        console.log(`Authenticated user: ${req.user}`);
        next();
    } catch (error) {
        console.error('Invalid token:', error.message);
        res.status(400).send({ message: 'Invalid token.' });
    }
};
