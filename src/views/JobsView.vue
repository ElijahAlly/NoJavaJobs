<template>
  <div class="jobs-page">
    <p class="catchphrase">
      If you're looking for jobs that require Java, you're on the wrong site :)
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
    // * TODO: Get recommended (location, upload date)
    this.loadAllJobs();
  },
  methods: {
    async loadAllJobs() {
      try {
        const fetchedJobs: JobType[] = await fetchAllJobs();
        const jobsStore = useJobsStore();
        const existingJobLinks = new Set(jobsStore.jobs.map(job => job.job_link));

        const newJobs = fetchedJobs.filter(job => !existingJobLinks.has(job.job_link));

        if (newJobs.length > 0) {
          jobsStore.addJobs(newJobs);
          jobsStore.sortJobs();
        }
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    }
  },
  components: {
    JobCards,
    Filters
  },
});
</script>

<style scoped lang="scss">
.jobs-page {
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  overflow-x: hidden;

  .catchphrase {
    font-family: 'Palantino';

    @media (max-height: 800px) {
      display: none;
    }
  }
  
  .jobs-list {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    overflow-y: hidden;
    overflow-x: hidden;
    height: 100%;
    width: 100vw;

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
