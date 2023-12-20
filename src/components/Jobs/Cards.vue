<template>
    <!-- * Separate into distinct card components with .map(job => <Card :job={...} />) -->
    <!-- * Add Color to job in the header based on rating & add colored "labels" for both public_rating/our_rating -->
    <div v-if="diceJobs" v-for="(job, i) in diceJobs" :key="i" class="component-wrapper">
        <div class="card-component">
            <div class="header-cont">
                <div class="title-cont" @click="">
                    <a :href="job.company_link" class="company" target="_blank" rel="noopener noreferrer">
                        <img :src="handleCompanyLogo(job.company_logo)" class="logo" alt="company logo" />
                        <h5 class="name">{{ job.company }}</h5>
                    </a>
                </div>
                <div class="rating-label our-rating">
                    <h5 class="value">
                        {{ job.date_posted }}
                    </h5>
                </div>
            </div>
            <div class="hero-cont">
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
    <p v-else>
        Loading cards...
    </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DiceJobType } from '@/types/Jobs';

export default defineComponent({
    name: 'Cards',
    props: {
        diceJobs: {
            type: Object as () => DiceJobType[],
            default: () => ([])
        }
    },
    // computed: {
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
    // },
    methods: {
        handleCompanyLogo(url: string = ''): string {
            if (url.length < 1 || url === 'https://cdn.filestackcontent.com/DKgl2bTTA3maTfcl1ugc') {
                return require('../../assets/NoJavaJobs-Placeholder-Logo-Transparent.png');
            }
            return url;
        },
        formatDescription(description: string = ''): string {
            if (!description) return description;
            return description.slice(0, 333);
        }
    }
})
</script>

<!--
    * // Todo: Implement scroll snapping -> https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts 
-->

<style scoped lang="scss">
.component-wrapper {

    .card-component {
        background-color: cadetblue;
        width: 42vw;
        max-width: 600px;

        .header-cont {
            display: flex;
            .title-cont {
                
                .company {
                    cursor: pointer;
                    
                    .logo {
                        height: auto;
                        width: 100px;
                    }
                    
                    .name {
                        width: fit-content;
                    }
                }
            }

            .job-info {
                
            }
        }
    }
}
</style>