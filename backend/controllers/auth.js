const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    console.log(`Registering user: ${username}`);
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(`Logging in user: ${username}`);
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.error('Invalid username');
            return res.status(400).send({ message: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.error('Invalid password');
            return res.status(400).send({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // 设置 token 过期时间为 24 小时
        res.send({ user, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(400).send(error);
    }
};

exports.updateProfile = async (req, res) => {
    const { _id: userId } = req.user;
    const { email, phone } = req.body;
    console.log(`Updating profile for user: ${userId}`);
    try {
        const user = await User.findByIdAndUpdate(userId, { email, phone }, { new: true });
        res.send({ user });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(400).send(error);
    }
};

exports.getProfile = async (req, res) => {
    const { _id: userId } = req.user;
    console.log(`Fetching profile for user: ${userId}`);
    try {
        const user = await User.findById(userId);
        res.send({ user });
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(400).send(error);
    }
};
