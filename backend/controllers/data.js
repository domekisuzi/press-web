//made by @domekisuzi at 2024/6/6:10:30
const Data = require('../models/data');

exports.addData = async (req, res) => {
    const { _id: userId } = req.user;
    const { date, heartRate, steps, spO2, bloodPressure, temperature, respiratoryRate, stressLevel, advice } = req.body;
    console.log(`Adding data for user: ${userId}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    try {
        if (!heartRate || !steps || !spO2 || !bloodPressure || !temperature || !respiratoryRate || !stressLevel) {
            throw new Error('Missing required fields');
        }
        const data = new Data({ userId, date, heartRate, steps, spO2, bloodPressure, temperature, respiratoryRate, stressLevel, advice });
        await data.save();
        res.status(201).send({ message: 'Data added successfully' });
    } catch (error) {
        console.error('Error adding data:', error.message);
        console.error(error.errors); // 输出具体的验证错误信息
        res.status(400).send({ message: error.message });
    }
};

exports.getData = async (req, res) => {
    const { _id: userId } = req.user;
    console.log(`Fetching data for user: ${userId}`);
    try {
        const data = await Data.find({ userId });
        res.send({ data });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(400).send({ message: error.message });
    }
};
