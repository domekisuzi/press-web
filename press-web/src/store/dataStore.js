import { defineStore } from 'pinia';
import piniaInstance from "@/global.js";

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        data: [
            // { date: '2024-06-01', heartRate: 70, steps: 5000, spO2: 98, bloodPressure: '120/80', temperature: 36.5, respiratoryRate: 16, stressLevel: 1, advice: '保持轻松，继续运动' },
            // { date: '2024-06-02', heartRate: 75, steps: 6000, spO2: 97, bloodPressure: '130/85', temperature: 36.7, respiratoryRate: 17, stressLevel: 2, advice: '注意休息，适当放松' },
            // { date: '2024-06-03', heartRate: 72, steps: 5500, spO2: 99, bloodPressure: '125/80', temperature: 36.6, respiratoryRate: 16, stressLevel: 1, advice: '继续保持，良好的状态' },
            // { date: '2024-06-04', heartRate: 80, steps: 4000, spO2: 95, bloodPressure: '135/90', temperature: 36.8, respiratoryRate: 18, stressLevel: 3, advice: '注意放松，减少压力' },
            // { date: '2024-06-05', heartRate: 68, steps: 7000, spO2: 98, bloodPressure: '115/75', temperature: 36.5, respiratoryRate: 15, stressLevel: 0, advice: '非常好，保持健康' },
            // { date: '2024-06-06', heartRate: 77, steps: 6500, spO2: 96, bloodPressure: '130/85', temperature: 36.7, respiratoryRate: 17, stressLevel: 2, advice: '继续保持，注意休息' },
            // { date: '2024-06-07', heartRate: 74, steps: 5800, spO2: 97, bloodPressure: '125/80', temperature: 36.6, respiratoryRate: 16, stressLevel: 1, advice: '保持良好的生活习惯' },
        ],
    }),
    actions: {
        addData(data) {
            this.data.push(data);
        },
    },
    getters: {
        recentSevenEntries(state) {
            return state.data.slice(-7);
        },
        averageStressLevel(state) {
            const recentData = this.recentSevenEntries;
            if (recentData.length === 0) return null;

            const totalStressLevel = recentData.reduce((sum, entry) => sum + entry.stressLevel, 0);
            return Math.round(totalStressLevel / recentData.length);
        },
    },
},{
    pinia: piniaInstance
});
