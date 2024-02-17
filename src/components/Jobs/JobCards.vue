<template>
  <!-- * Separate into distinct card components with .map(job => <Card :job={...} />) -->
  <!-- * Add Color to job in the header based on rating & add colored "labels" for both public_rating/our_rating -->
  <div class="list-wrapper">
    <div class="list-header">
      <div class="jobs-count">{{ formatJobsCount(jobs.length) }}</div>
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
    <div class="jobs-wrapper jobs-column">
      <div v-if="jobs" v-for="(job, i) in paginatedJobs()" :key="i" class="card-component">
        <div class="tags-cont" >
          <span class="remote-tag" v-if="job.is_remote">remote</span>
          <span v-if="!job.is_remote"></span>
          <span class="easy-apply-tag" v-if="job.easy_apply">easy apply</span>
          <span v-if="!job.easy_apply"></span>
        </div>
        <div class="header-cont">
          <div class="company-cont">
            <a
              :href="job.company_link ? job.company_link : '#'"
              class="company-logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                :src="handleCompanyLogo(job.company_logo)"
                class="logo"
                alt="company-logo"
              />
            </a>
            <a
              :href="job.company_link || '#'"
              class="company-name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h5 class="name">{{ job.company }}</h5>
            </a>
          </div>
          <div class="job-data">
            <a 
              class="listing-site"
              :href="`https://${job.job_board}.com`"
              target="_blank"
              :style="{
                color: getColorByJobBoard(job.job_board),
                borderColor: getColorByJobBoard(job.job_board),
              }"
            >
              {{ job.job_board }}
            </a>
            <h5 class="location">
              {{ job.location && `${job.location}` }}
            </h5>
            <h5 class="date-posted">
              posted {{ formatDate(job.date_posted) }}
            </h5>
          </div>
        </div>
        <div class="title-cont">
          <a class="title" :title="job.title" :href="job.job_link">
            {{ job.title }}
          </a>
        </div>
        <div class="card-body">
          <p>{{ 
            job.description_list?.length
            ? formatDescription(job.description_list) 
            : 'Could not grab description. There may still be a description on the original job post. Click to find out.' 
          }}</p>
        </div>
      </div>
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
    ...mapState(useJobsStore, ['isSortedByMostRecent']),
    ...mapState(useJobsStore, ['isSortedRandomly']),
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
    paginatedJobs() {
      // console.log('jobs', this.jobs);
      const start = (this.currentPage - 1) * this.jobsPerPage;
      const end = start + this.jobsPerPage;
      return this.jobs.slice(start, end);
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
    handleCompanyLogo(url = ""): string {
      if (
        !url
        || url.length < 1
        || url === "https://cdn.filestackcontent.com/DKgl2bTTA3maTfcl1ugc"
      ) {
        return require("../../assets/NoJavaJobs-Placeholder-Logo-Transparent.png");
      }
      return url;
    },
    formatDescription(description = ""): string {
      if (!description) return description;
      return this.isColumn ? description.slice(0, 333).trimEnd() + '...' : description.slice(0, 777).trimEnd() + '...';
    },
    getColorByJobBoard(jobBoard = ""): string {
      switch (jobBoard.toLowerCase()) {
        case 'dice':
          return 'crimson'
        case 'indeed':
          return 'blue'
        case 'linkedin':
          return 'dodgerblue'
        case 'glassdoor':
          return 'green'
        case 'ziprecruiter':
          return 'limegreen'
      
        default:
          return '#f66d65'
      }
    },
    formatDate(dateString: string): string {
      const now = new Date();
      const date = new Date(dateString);
      const diffInMs = now.getTime() - date.getTime();
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

      if (diffInHours < 24) {
        return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
      } 

      const diffInDays = Math.floor(diffInHours / 24);
      
      if (diffInDays <= 30) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      } else {
        // Format as "month day" for dates older than 30 days
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `on ${monthNames[date.getMonth()]} ${date.getDate()}`;
      }
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
    
    .card-component {
      scroll-snap-align: start;
      scroll-behavior: smooth;
      border: 1px solid #486071;
      width: 45vw;
      max-width: 600px;
      min-width: 300px;
      margin-bottom: 24px;
      margin-left: 3px;
      padding: 21px;
      
      &:hover {
        border-left-width: 3px;
        border-left-color: #f66d65;
        margin-left: 1px;
      }
      
      &:hover > .company-logo {
        margin-left: 0px;
      }
      
      @media (max-width: 800px) {
        min-width: 80%;
      }
      
      .tags-cont {
        display: flex;
        width: 100%;
        min-height: fit-content;
        align-items: center;
        justify-content: center;

        span {
          background-color: transparent;
          color: white;
          padding: 6px;
        }

        .remote-tag {
          background-color: rgba(157, 101, 246, 0.81);
          min-width: 51px;
          margin: 0 6px;
        }

        .easy-apply-tag {
          background-color: rgba(0, 128, 0, 0.81);
          min-width: 51px;
          margin: 0 6px;
        }
      }

      .header-cont {
        display: flex;
        width: 100%;
        justify-content: space-between;
        user-select: none;
        margin-bottom: 3px;
        
        .company-cont {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          
          .company-logo {
            margin: 2px;
            height: 60px;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            
            .logo {
              cursor: pointer;
              width: 100%;
              height: auto;
              object-fit: cover;
              
              &:hover {
                box-shadow: whitesmoke 1px 1px 1px 1px;
              }
            }
          }
          
          .company-name {
            text-decoration: none;
            
            .name {
              cursor: pointer;
              width: fit-content;
              display: inline-flex;
              flex-wrap: nowrap;
              max-width: 100%; 
              font-weight: 400;
              font-size: medium;
              margin: 0;
              color: black;
              text-underline-offset: 2px;
              
              &:hover {
                text-decoration: 1px solid underline black; 
              }
            }
          }
        }
        
        .job-data {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          
          .listing-site {
            cursor: pointer;
            width: fit-content;
            padding: 9px;
            font-weight: 400;
            font-size: small;
            transition: 0.21s;
            text-decoration: none;
            border: 1px solid crimson;
            color: crimson;
            background-color: inherit;
            
            &:hover {
              background-color: whitesmoke;
            }
          }
          
          .date-posted, .location {
            display: flex;
            justify-content: end;
            width: fit-content;
            min-width: 124px;
            margin: 0;
            font-weight: 400;
            font-size: small;
            color: black;
          }
        }
        
      }
      
      .title-cont {
        margin-top: 12px;

        .title {
          color: crimson;
          cursor: pointer;
          width: fit-content;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
          
          &:hover {
            text-decoration-thickness: 2px;
          }
        }
      }
    }
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

    .card-component {
      scroll-snap-align: start;
      height: 51vh;
      width: 75%;
      min-width: 75%;
      margin-right: 21px;
      
      &:hover {
        border-left-width: 3px;
        border-left-color: #f66d65;
        margin-left: 1px;
      }
      
      &:hover > .company-logo {
        margin-left: 0px;
      }
      
      @media (max-width: 800px) {
        min-width: 80%;
      }
      
      .header-cont {
        margin-bottom: 21px;

      //   .company-cont {
          
      //     .company-logo {
            
      //       .logo {
              
      //         &:hover {

      //         }
      //       }
      //     }
          
          // .company-name {
            
          //   .name {
              
              
          //     &:hover {

          //     }
          //   }
          // }
        // }
        
        // .job-data {
          
          
          // .listing-site {
            
            
          //   &:hover {

          //   }
          // }
          
          // .date-posted, .location {
            
          // }
        // }
        
      }
      
      .title-cont {
        
        .title {
          color: crimson;
          cursor: pointer;
          width: fit-content;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
          
          &:hover {
            text-decoration-thickness: 2px;
          }
        }
      }
    }
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
