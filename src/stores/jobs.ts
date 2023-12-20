import { DiceJobType } from '@/types/Jobs';
import { defineStore } from 'pinia';

export const useJobsStore = defineStore('jobs', {
    state: () => ({
        diceJobs: [] as DiceJobType[],
    }),
    getters: {
        getAllDiceJobsFromState: (state) => state.diceJobs,
    },
    // actions: {
    //     increment() {
    //         this.count++
    //     },
    // },
});
