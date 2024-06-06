//made by @domekisuzi at 2024/6/6:10:30
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    heartRate: { type: Number, required: true },
    steps: { type: Number, required: true },
    distance: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    spO2: { type: Number, required: true },
    systolicBp: { type: Number, required: true },
    diastolicBp: { type: Number, required: true },
    temperature: { type: Number, required: true },
    respiratoryRate: { type: Number, required: true },
    stressLevel: { type: Number, required: true },
    advice: { type: String, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model('Data', dataSchema);

