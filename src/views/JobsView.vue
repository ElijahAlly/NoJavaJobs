<template>
  <div class="jobs-page">
    <h1>This is the job page</h1>
    <p>
      "If you're looking for jobs that require Java, you're on the wrong site
      :)"
    </p>
    <div class="jobs-list">
      <Filters />
      <JobCards />
    </div>
  </div>
</template>

<script lang="ts">
import { useJobsStore } from "@/stores/jobs";
import { defineComponent } from "vue";
import { fetchAllJobs } from "@/api/jobs";
import { JobType } from "@/types/Jobs";
import JobCards from "@/components/Jobs/JobCards.vue";
import Filters from "@/components/Jobs/Filters.vue";

export default defineComponent({
  name: "JobsView",
  mounted() {
    // * TODO: Get recommended (recent, In_Question mostly)
    this.loadAllJobs();
  },
  methods: {
    // For fetching all jobs
    async loadAllJobs() {
      try {
        const jobs = await fetchAllJobs();
        const mixedJobs = this.mixJobsByBoard(jobs);
        useJobsStore().$patch((state) => {
          state.jobs.push(...mixedJobs);
        });
        // console.log(this.jobs)
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    },
    mixJobsByBoard(jobs: JobType[]): JobType[] {
      // Group jobs by their job_board
      const jobsByBoard: Record<string, any[]> = {};
      jobs.forEach((job, i) => {
        if (!job.job_board) return;
        if (!jobsByBoard[job.job_board]) {
          jobsByBoard[job.job_board] = [];
        }
        jobsByBoard[job.job_board].push(job);
      });

      // Prepare for mixing
      const mixedJobs: any[] = [];
      const jobBoards = Object.keys(jobsByBoard);
      let jobsLeftToAdd = jobs.length;

      // While there are jobs left to add
      while (jobsLeftToAdd > 0) {
        jobBoards.forEach(board => {
          if (jobsByBoard[board].length) {
            mixedJobs.push(jobsByBoard[board].shift());
            jobsLeftToAdd--;
          }
        });
      }

      return mixedJobs;
    }
  },
  components: {
    JobCards,
    Filters
},
  // data() {
  //     return {
  //         statements: null as StatementType[] | null,
  //     };
  // },
});
</script>

<style scoped lang="scss">
.jobs-page {
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  
  .jobs-list {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    overflow-y: hidden;
    height: 100%;
    width: 100vw;

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
