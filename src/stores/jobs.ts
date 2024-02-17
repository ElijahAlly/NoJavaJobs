import { JobType } from '@/types/Jobs';
import { defineStore } from 'pinia';

export const useJobsStore = defineStore('jobs', {
    state: () => ({
        jobs: [] as JobType[],
        filteredJobs: [] as JobType[],
        // as the this.jobs array changes, jobsRandomlyMixed acts as a backup of the initially fetched jobs when the page loads
        jobsRandomlyMixed: [] as JobType[],
        jobsMostRecent: [] as JobType[],
        jobsZipRecruiter: [] as JobType[],
        jobsIndeed: [] as JobType[],
        jobsLinkedIn: [] as JobType[],
        jobsGlassdoor: [] as JobType[],
        shouldMixJobs: false,
        searchQuery: '',
        locationQuery: '',
        filtersActive: false,
        isSortedRandomly: true,
        isSortedByMostRecent: false,
        // jobsDice: [] as JobType[],
        // jobsTopTech: [] as JobType[],
    }),
    getters: {
        getJobsFromState: (state) => state.jobs,
        // getAllTopTechJobsFromState: (state) => state.jobsTopTech,
    },
    actions: {
        handleOtherActiveFilters(filter: 'searchQuery' | 'locationQuery') {
            switch (filter) {
                case 'searchQuery':
                    if (this.locationQuery.length) {
                        this.filterJobs(this.jobs, this.locationQuery, true);
                    }
                    return;

                case 'locationQuery':
                    if (this.searchQuery.length) {
                        this.filterJobs(this.jobs, this.searchQuery);
                    }
                    return;

                default:
                    return false;
            }
        },
        getJobsListBasedOnActiveSorting() {
            if (this.isSortedRandomly) {
                return this.jobsRandomlyMixed;
            } else {
                return this.jobsMostRecent;
            }
        },
        setJobsListBasedOnActiveSorting() {
            if (this.isSortedRandomly) {
                this.setRandomlyMixedJobs();
            } else if (this.isSortedByMostRecent) {
                this.setMostRecentJobs();
            }
        },
        checkAllFiltersStatus() {
            if (!this.searchQuery && !this.locationQuery) { 
                // filters are inactive
                this.filtersActive = false;
                
                this.setJobsListBasedOnActiveSorting();
            }

            // filters are active
            this.filtersActive = true;
        },
        setMostRecentJobs() {
            if (!this.jobs) return []; // filters are active (or for some other reason) no jobs are showing
            const jobs = this.filteredJobs.length ? this.filteredJobs : this.jobs;
            console.log('jobs', jobs);
            if (this.filtersActive) { // filters are active
                this.jobs = this.jobsMostRecent.filter(job =>
                    jobs.some(stateJob => stateJob._id === job._id)
                )
                return;
            } else { // filters are inactive
                this.jobs = jobs;
                return;
            }
        },
        setRandomlyMixedJobs() { 
            if (!this.jobs) return []; // filters are active (or for some other reason) no jobs are showing
            const jobs = this.filteredJobs.length ? this.filteredJobs : this.jobs;
            if (this.filtersActive) { // filters are active
                this.jobs = this.jobsRandomlyMixed.filter(job =>
                    jobs.some(stateJob => stateJob._id === job._id)
                )
                return;
            } else { // filters are inactive
                this.jobs = jobs;
                return;
            }
        },
        addJobs(newJobs: JobType[]) {
            this.jobs.push(...newJobs);
            this.shouldMixJobs = true;
        },
        clearSearchQuery() {
            this.searchQuery = '';
            this.checkAllFiltersStatus();
            this.handleOtherActiveFilters('searchQuery');
        },
        setSearchQueryAndFilter(query: string) {
            if (!query) { // new query is empty string
                this.clearSearchQuery();
                return;
            }

            this.filtersActive = true;
            if (query.length < this.searchQuery.length) { // deleted character from query
                this.searchQuery = query;
                this.filterJobs(this.getJobsListBasedOnActiveSorting(), this.searchQuery); // TODO: fix when other filters are active
                this.handleOtherActiveFilters('searchQuery'); 
            } else { // added character to query
                this.searchQuery = query;
                this.filterJobs(this.jobs, this.searchQuery);
            }
        },
        clearLocationQuery() {
            this.locationQuery = '';
            this.checkAllFiltersStatus();
            this.handleOtherActiveFilters('locationQuery');
        },
        setLocationQueryAndFilter(query: string) {
            if (!query) { // new query is empty string
                this.clearLocationQuery();
                return;
            }
            
            this.filtersActive = true;
            if (query.length < this.locationQuery.length) { // deleted character from query
                this.locationQuery = query;
                this.filterJobs(this.handleOtherActiveFilters('locationQuery') ? this.jobs : this.getJobsListBasedOnActiveSorting(), this.locationQuery, true);
            } else { // added character to query
                this.locationQuery = query;
                this.filterJobs(query.includes(',') ? this.getJobsListBasedOnActiveSorting() : this.jobs, this.locationQuery, true);
            }
        },
        filterJobs(jobs: JobType[], query: string, byLocation: boolean = false) {
            query = query.toLowerCase();

            if (byLocation && query !== ',' && query.includes(',')) {
                const filteredJobsByMultipleLocations: JobType[] = [];
                const queries: string[] = query.split(',');
                const uniqueQueries: string[] = [];

                for (let i = 0; i < queries.length; i++) {
                    const char = queries[i].trim().toLowerCase();
                    let isNotInUniqueQueries = true;
                    for (let j = 0; j < uniqueQueries.length; j++) {
                        if (char === uniqueQueries[j].toLowerCase()) isNotInUniqueQueries = false;
                    }
                    if (isNotInUniqueQueries) uniqueQueries.push(char);
                }
 
                while (uniqueQueries && uniqueQueries.length && uniqueQueries[0].length) {
                    const locationQuery = uniqueQueries.shift();
                    if (!locationQuery) continue;
                    jobs.forEach(job => {
                        if (job.location?.toLowerCase().includes(locationQuery)) {
                            filteredJobsByMultipleLocations.push(job);
                        }
                    })
                }

                this.jobs = filteredJobsByMultipleLocations;
                return;
            }

            this.jobs = jobs.filter(job => {
                if (byLocation) {
                    return job.location?.toLowerCase().includes(query)
                }
                
                return job.title.toLowerCase().includes(query)
                || job.company.toLowerCase().includes(query)
                || job.description_list?.toLowerCase().includes(query)
                || job.employment_skills?.toLowerCase().includes(query)
            });
        },
        sortJobs() {
            if (this.shouldMixJobs) {
                // Sort jobs by job board
                this.sortJobsByBoard();
                
                // Sort jobs by most recent
                this.sortByMostRecent();
                
                // Randomly mix jobs
                this.sortByRandomlyMixed();
                
                this.shouldMixJobs = false;
            }
        },
        sortByMostRecent() {
            this.jobs = this.jobs.filter(job => job.date_posted !== undefined);

            this.jobs.sort((a, b) => {
                const dateA = new Date(a.date_posted);
                const dateB = new Date(b.date_posted);
                return dateB.getTime() - dateA.getTime();
            });
            this.jobsMostRecent = [...this.jobs];
            // console.log('sortedJobs', sortedJobs);
            // console.log('jobsMostRecent', this.jobsMostRecent);
        },
        sortByRandomlyMixed() {
            for (let i = this.jobs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.jobs[i], this.jobs[j]] = [this.jobs[j], this.jobs[i]];
            }

            this.jobsRandomlyMixed = this.jobs;
        },
        sortJobsByBoard() {
            this.jobs.forEach((job) => {
                if (!job.job_board) return;
                switch (job.job_board) {
                    case 'Glassdoor':
                        this.jobsGlassdoor.push(job);
                        break;

                    case 'Indeed':
                        this.jobsIndeed.push(job);
                        break;

                    case 'LinkedIn':
                        this.jobsLinkedIn.push(job);
                        break;

                    case 'ZipRecruiter':
                        this.jobsZipRecruiter.push(job);
                        break;

                    default:
                        break;
                }
            });
        },
        setFilteredJobs() {
            console.log('filteredJobs', this.filteredJobs);
            if (this.filteredJobs.length) {
                const jobs = this.isSortedByMostRecent ? this.jobsMostRecent : this.jobsRandomlyMixed;

                this.filteredJobs = jobs.filter(job =>
                    this.filteredJobs.some(stateJob => stateJob._id === job._id)
                )
                this.jobs = this.filteredJobs;
                console.log('this.jobs', this.jobs); 
            } else if (!this.filteredJobs.length) {
                this.jobs = this.getJobsListBasedOnActiveSorting();
            }
        }
    },
});
