const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use('/api', authRoutes);
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
