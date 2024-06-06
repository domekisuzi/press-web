import { defineStore } from 'pinia';
import piniaInstance from "@/global.js";

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        data: [],
    }),
    actions: {
        addData(data) {
            this.data.push(data);
        },
        setData(data) {
            this.data = data;
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
