<template>
  <!-- * Separate into distinct card components with .map(job => <Card :job={...} />) -->
  <!-- * Add Color to job in the header based on rating & add colored "labels" for both public_rating/our_rating -->
  <div class="component-wrapper">
    <div v-if="jobs" v-for="(job, i) in jobs" :key="i" class="card-component">
      <div class="header-cont">
        <div class="title-cont">
          <a
            :href="job.company_link ? job.company_link : '#'"
            class="company-logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :src="job.company_logo ? handleCompanyLogo(job.company_logo) : 'https://cdn.filestackcontent.com/DKgl2bTTA3maTfcl1ugc'"
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
          <h5 class="date-posted">
            posted {{ formatDate(job.date_posted) }}
          </h5>
        </div>
      </div>
      <div class="title-cont">
        <h3 class="title" :title="job.title">
          {{ job.title }}
        </h3>
      </div>
      <div class="card-body">
        <p>{{ formatDescription(job.description_list) }}</p>
      </div>
      <!-- <Links v-for="(job, i) in firstChunk" :key="i" :job="job" /> -->
    </div>
  </div>
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
  computed: {
    ...mapState(useJobsStore, ["jobs"]),
    ...mapState(useJobsStore, ["topTechJobs"]),
  //     Styles() {
  //         const styles = {
  //             publicRatingColor: 'gray',
  //             ourRatingColor: 'gray',
  //             secondaryColor: '#063948',
  //             decorationStyle: 'solid'
  //         };

  //         const getCorrectColor = (rating: string) => {
  //             switch (rating) {
  //                 case 'Proven_Truth':
  //                     return 'rgb(55, 196, 239)';
  //                 case 'In_Question':
  //                     return 'rgb(239, 190, 55)';
  //                 case 'Not_True':
  //                     return 'rgb(239, 55, 104)';
  //                 default:
  //                     console.log('rating', rating);
  //                     return 'gray';
  //             }
  //         }

  //         styles.publicRatingColor = getCorrectColor(this.$props.job.public_rating);
  //         styles.ourRatingColor = getCorrectColor(this.$props.job.our_rating);
  //         return styles;
  //     },
  },
  methods: {
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
      return description.slice(0, 333).trimEnd() + '...';
    },
    getColorByJobBoard(jobBoard = ""): string {
      switch (jobBoard.toLowerCase()) {
        case 'dice':
          return 'crimson'
        case 'indeed':
          return 'skyblue'
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
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if(diffInHours < 24) {
        return `${Math.floor(diffInHours)} hrs ago`;
      } 

      const diffInDays = diffInHours / 24;
      
      if (diffInDays < 30) {
        return `${Math.floor(diffInDays)} days ago`;
      } else {
        // Format as "month day" for dates older than 30 days
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `on ${monthNames[date.getMonth()]} ${date.getDate()}`;
      }
    }
  },
});
</script>

<!--
    * // Todo: Implement scroll snapping -> https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts 
-->

<style scoped lang="scss">
.component-wrapper {
  overflow-y: auto;

  .card-component {
    border: 1px solid lightgray;
    width: 45vw;
    max-width: 600px;
    min-width: 300px;
    margin: 3px 3px 24px 3px;
    padding: 21px;
  
    &:hover {
      border-width: 3px;
      border-top-width: 1px;
      border-right-width: 1px;
      border-bottom-width: 1px;
      border-left-color: #f66d65;
      margin: 3px 1px 24px 1px;
    }

    @media (max-width: 800px) {
      min-width: 80%;
    }

    .header-cont {
      display: flex;
      width: 100%;
      justify-content: space-between;
      user-select: none;

      .title-cont {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        
        .company-logo {
          margin: 0;
          height: 100px;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          
          .logo {
            cursor: pointer;
            width: 100%;
            height: auto;
            object-fit: cover;
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
            font-size: large;
            margin: 0;
            color: black;
            text-decoration: 2px solid underline black; 
            text-underline-offset: 2px;
            
            &:hover {
              text-decoration-style: wavy;
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

        .date-posted {
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

      .title {
        color: crimson;
        cursor: pointer;
        width: fit-content;

        &:hover {
          text-decoration: 2px solid underline crimson;
          text-underline-offset: 2px;
          
        }
      }
    }
  }
}
</style>
