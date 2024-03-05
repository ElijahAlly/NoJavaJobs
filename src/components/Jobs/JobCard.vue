<template>
    <div v-if="job" :class="`card ${isColumn ? '' : 'card-row'}`">
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
        posted {{ getFormattedDate(job.date_posted) }}
    </h5>
</div>
        </div>
        <div class="title-cont">
            <a class="title" :title="job.title" :href="job.job_link">
                {{ job.title }}
            </a>
        </div>
        <div class="card-body">
            <p>
                {{ 
                    job.description_list?.length
                    ? getFormattedDescription(job.description_list, isColumn) 
                    : 'Could not grab description. There may still be a description on the original job post. Click to find out.' 
                }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { JobType } from '@/types/Jobs';
import { formatDate, formatDescription } from '@/utils/formatting';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "JobCard",
    props: {
        job: {
            type: Object as () => JobType,
            default: () => ({})
        },
        isColumn: {
            type: Boolean,
            default: true
        },
    },
    methods: {
        getFormattedDescription(description = "", isColumn: boolean = true) {
            return formatDescription(description, isColumn)
        },
        getFormattedDate(dateString: string) {
            return formatDate(dateString);
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
    }
})
</script>

<style scoped lang="scss">
.card {
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

    .no-jobs-found {
        border: #f66d65;
        color: #f66d65;
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
                justify-content: flex-end;
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

.card-row {
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
}
</style>