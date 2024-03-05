<template>
  <!-- * Separate into distinct card components with .map(job => <Card :job={...} />) -->
  <!-- * Add Color to job in the header based on rating & add colored "labels" for both public_rating/our_rating -->
  <div class="list-wrapper">
    <div class="list-header">
      <div class="jobs-count">{{ formatJobsCount(areFiltersActive ? filteredJobs.length : jobs.length) }}</div>
      <div class="actions">
        <div class="sorting">
          <div :class="`random-btn ${isSortedRandomly ? 'random-active' : ''}`" :onClick="sortRandomly">random</div>
          <div :class="`most-recent-btn ${isSortedByMostRecent ? 'most-recent-active' : ''}`" :onClick="sortMostRecent">most recent</div>
          <!-- TODO: Add filter for job board (indeed, linkedin, etc.) -->
        </div>
        <div class="directions">
          <div :class="`column-btn ${isColumn ? 'column-active' : ''}`" :onClick="displayAsColumn">column</div>
          <div :class="`row-btn ${isRow ? 'row-active' : ''}`" :onClick="displayAsRow">row</div>
        </div>
      </div>
    </div>
    <div v-if="areFiltersActive && filteredJobs.length" class="jobs-wrapper jobs-column">
      <JobCard v-for="(job, i) in paginatedJobs(filteredJobs)" :job="job" :isColumn="isColumn" :key="i"/>
    </div>
    <div v-else-if="areFiltersActive && !filteredJobs.length" class="jobs-wrapper jobs-column">
      <div class="no-jobs-found">No Jobs that match the filters were found. Please alter your search queyries and try again!</div>
    </div>
    <div v-else-if="!areFiltersActive" class="jobs-wrapper jobs-column">
      <JobCard v-for="(job, i) in jobs.length ? paginatedJobs(jobs) : []" :job="job" :isColumn="isColumn" :key="i"/>
    </div>
    <div class="pagination">
      <div class="options">
        <select v-model="jobsPerPage" @change="currentPage = 1">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>jobs per page</span>
      </div>
      <div class="buttons">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>
          Page {{ currentPage }} of {{ maxPage() }}
        </span>
        <button @click="nextPage" :disabled="currentPage === maxPage()">Next</button>
      </div>
    </div>
  </div>
  <!-- <Links v-for="(job, i) in firstChunk" :key="i" :job="job" /> -->
  <div v-if="!jobs || jobs.length < 1" class="component-wrapper">
    <div class="card-component"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import { JobType } from "@/types/Jobs";
import { useFiltersStore } from "@/stores/filters";
import JobCard from "./JobCard.vue";

export default defineComponent({
  name: "JobCards",
  data() {
    return {
      isColumn: true,
      isRow: false,
      currentPage: 1,
      jobsPerPage: 10,
    }
  },
  computed: {
    ...mapState(useJobsStore, ['jobs']),
    ...mapState(useJobsStore, ['filteredJobs']),
    ...mapState(useJobsStore, ['jobsRandomlyMixed']),
    ...mapState(useJobsStore, ['isSortedByMostRecent']),
    ...mapState(useJobsStore, ['isSortedRandomly']),
    ...mapState(useFiltersStore, ['areFiltersActive']),
  },
  components: {
    JobCard
  },
  methods: {
    scrollToTop() {
      const jobsList = document.getElementsByClassName('jobs-wrapper')[0];
      if (jobsList) jobsList.scrollTo({ top: 0, behavior: 'smooth' });
    },
    nextPage() {
      this.currentPage = Math.min(this.currentPage + 1, this.maxPage());
      this.scrollToTop();
    },
    prevPage() {
      this.currentPage = Math.max(this.currentPage - 1, 1)
      this.scrollToTop();
    },
    maxPage() {
      return Math.ceil(this.jobs.length / this.jobsPerPage);
    },
    paginatedJobs(jobArr: JobType[]) {
      const start = (this.currentPage - 1) * this.jobsPerPage;
      const end = start + this.jobsPerPage;
      return jobArr.slice(start, end);
    },
    formatJobsCount(jobsCount: number) {
      return jobsCount === 1 ? '1 job' : `${jobsCount.toLocaleString()} jobs`
    },
    sortRandomly() {
      if (useJobsStore().isSortedRandomly) return;
      useJobsStore().setRandomlyMixedJobs();
      this.scrollToTop();
      useJobsStore().isSortedRandomly = true;
      useJobsStore().isSortedByMostRecent = false;
    },
    sortMostRecent() {
      if (useJobsStore().isSortedByMostRecent) return;
      useJobsStore().setMostRecentJobs();
      this.scrollToTop();
      useJobsStore().isSortedByMostRecent = true;
      useJobsStore().isSortedRandomly = false;
    },
    handleTopTechCompanyLogo(url = ""): string {
      if (
        url.length < 1 ||
        url === "https://"
      ) {
        return require("../../assets/NoJavaJobs-Placeholder-Logo-Transparent.png");
      }
      return url;
    },
    displayAsRow() {
      if (this.isRow) return;
      const jobsEle = document.getElementsByClassName('jobs-wrapper')[0];
      if (!jobsEle) return;
      if (jobsEle.classList.contains('jobs-column')) {
        this.isColumn = false;
        this.isRow = true;
        jobsEle.classList.remove('jobs-column');
        jobsEle.classList.add('jobs-row');
      }
    },
    displayAsColumn() {
      if (this.isColumn) return;
      const jobsEle = document.getElementsByClassName('jobs-wrapper')[0];
      if (!jobsEle) return;
      if (jobsEle.classList.contains('jobs-row')) {
        this.isRow = false;
        this.isColumn = true;
        jobsEle.classList.remove('jobs-row');
        jobsEle.classList.add('jobs-column');
      }
    }
  },
});
</script>

<!--
  * // Todo: Implement scroll snapping -> https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts 
-->

<style scoped lang="scss">

.list-wrapper {
  position: relative;
  overflow: hidden;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .list-header {
    height: 6vh;
    width: 41vw;
    min-width: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin: 0;
    position: sticky;
    user-select: none;
    box-shadow: 0px 9px 8px -9px #486071;

    .jobs-count {
      border-bottom: 1px solid #486071;
      padding: 3px 3px 3px;
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .directions, .sorting {
      border-radius: 6px;
      width: fit-content;
      display: flex;
      height: fit-content;
      padding-left: 12px;

      .column-btn, .random-btn {
        border: 1px solid #486071;
        padding: 4px;
        cursor: pointer;

        &:hover {
          color: #f66d65;
          border-left-color: #f66d65;
          border-top-color: #f66d65;
          border-bottom-color: #f66d65;
        }
      }
      
      .row-btn, .most-recent-btn {
        padding: 4px;
        cursor: pointer;
        border: 1px solid #486071;
        border-left: none;

        &:hover {
          color: #f66d65;
          border-right-color: #f66d65;
          border-top-color: #f66d65;
          border-bottom-color: #f66d65;
        }
      }

      .random-active, .column-active {
        color: rgba(72, 96, 113, 0.6);
        border-left-color: rgba(72, 96, 113, 0.6);
        border-top-color: rgba(72, 96, 113, 0.6);
        border-bottom-color: rgba(72, 96, 113, 0.6);

        &:hover {
          color: rgba(72, 96, 113, 0.6);
          border-color: rgba(72, 96, 113, 0.6);
          border-right-color: #486071;
        }
      }

      .row-active, .most-recent-active {
        color: rgba(72, 96, 113, 0.6);
        border-right-color: rgba(72, 96, 113, 0.6);
        border-top-color: rgba(72, 96, 113, 0.6);
        border-bottom-color: rgba(72, 96, 113, 0.6);

        &:hover {
          color: rgba(72, 96, 113, 0.6);
          border-color: rgba(72, 96, 113, 0.6);
        }
      }
    }
  }
  
  .jobs-wrapper {
    overflow-y: scroll;
    scroll-behavior: smooth;
    height: 72vh;
    width: 90%;
    display: flex;
    align-items: center;
    padding-top: 9px;
    scroll-snap-type: y proximity;
    scroll-padding-top: 9px;

    &::-webkit-scrollbar {
      width: 9px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #486071;
      border-radius: 6px;
    }


    &::-webkit-scrollbar-corner {
      background-color: transparent;
    } 
    
    // .card-wrapper {
      
    // }
  }

  .jobs-column {
    flex-direction: column;
  }

  .jobs-row {
    scroll-snap-type: x proximity;
    scroll-padding-left: 30px;
    flex-direction: row;
    align-items: start;
    padding-top: 12px;
    padding-left: 12px;
    height: 60vh;
    width: 45vw;
    box-shadow: 0px 0px 18px -9px #486071 inset;

    // .card-wrapper {
      
    // }
  }

  .pagination {
    height: 6vh;
    width: 41vw;
    min-width: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin: 0;
    position: sticky;
    bottom: 0;
    user-select: none;
    box-shadow: 0px -9px 8px -9px #486071;

    .options {
      
      select {
        margin-right: 9px;
        border: 1px solid #486071;
        padding: 4px;
        cursor: pointer;

        &:focus {
          border: none;
          outline: 1px solid #486071;
        }
      }
    }

    .buttons {
      button {
        border: 1px solid #486071;
        padding: 4px;
        cursor: pointer;
      }

      span {
        margin: 0 9px;
      }
    }
  }
}
</style>
