import { JobType, TopTechJobType } from '@/types/Jobs';
import { defineStore } from 'pinia';

export const useJobsStore = defineStore('jobs', {
    state: () => ({
        jobs: [] as JobType[],
        topTechJobs: [] as JobType[],
    }),
    getters: {
        getAllJobsFromState: (state) => state.jobs,
        getAllTopTechJobsFromState: (state) => state.topTechJobs,
    },
    // actions: {
    //     increment() {
    //         this.count++
    //     },
    // },
});
