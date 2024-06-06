// made by @domekisuzi at 2024/6/6:10:30
const Data = require('../models/data');


exports.addData = async (req, res) => {
    const { _id: userId } = req.user;
    const { heartRate, steps, distance, caloriesBurned, spO2, systolicBp, diastolicBp, temperature, respiratoryRate ,stressLevel,date,advice} = req.body;
    console.log(`Adding data for user: ${userId}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);

    try {
        // if (!heartRate || !steps || !distance || !caloriesBurned || !spO2 || !systolicBp || !diastolicBp || !temperature || !respiratoryRate || !stressLevel || !advice || !date) {
        //     throw new Error('Missing required fields');
        // }

        const data = new Data({
            userId,
            date,
            heartRate,
            steps,
            distance,
            caloriesBurned,
            spO2,
            systolicBp,
            diastolicBp,
            temperature,
            respiratoryRate,
            stressLevel,
            advice
        });

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

// 用于生成建议的函数
function getAdvice(stressLevel) {
    switch (stressLevel) {
        case 0:
            return '保持良好的生活习惯';
        case 1:
            return '保持轻松，继续运动';
        case 2:
            return '注意休息，适当放松';
        case 3:
            return '请注意高压力，尽快寻求专业帮助';
        default:
            return '';
    }
}
