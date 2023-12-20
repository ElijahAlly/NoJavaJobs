<template>
    <div class="jobs">
        <h1>This is the job page</h1>
        <p>"If you're looking for jobs that require Java, you're on the wrong site :)"</p>
        <div v-if="diceJobs" class="jobs"></div>
        <Cards :diceJobs="diceJobs" />
    </div>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { useJobsStore } from '@/stores/jobs';
import { defineComponent } from 'vue';
import { fetchAllDiceJobs } from '@/api/jobs'
import Cards from '@/components/Jobs/Cards.vue';

export default defineComponent({
    name: 'JobsView',
    mounted() {
        // * TODO: Get recommended (recent, In_Question mostly) 
        this.loadAllJobs();
    },
    methods: {
        // For fetching all jobs
        async loadAllJobs() {
            try {
                const diceJobs = await fetchAllDiceJobs();
                this.diceJobs = diceJobs;
                useJobsStore().$patch((state) => {
                    state.diceJobs.push(...diceJobs);
                })
                console.log(this.diceJobs);
            } catch (error) {
                console.error('Failed to load jobs:', error);
            }
        },
    },
    computed: {
        ...mapState(useJobsStore, ['diceJobs'])
    },
    components: {
        Cards,
    },
    // data() {
    //     return {
    //         statements: null as StatementType[] | null,
    //     };
    // },
});
</script>

<style scoped lang="scss">
</style>