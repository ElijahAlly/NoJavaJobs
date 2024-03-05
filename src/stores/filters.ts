import { FilterType, FilterGroupsType, FilterLabelType, RangeGroupType, PostedDateLabelType } from '@/types/Filters';
import { defineStore } from 'pinia';
import { useJobsStore } from './jobs';

export const useFiltersStore = defineStore('filters', {
    state: (): FilterType => ({
        areFiltersActive: false,
        postedDate: {
            // * will deselect others
            any: { active: true, label: 'any' },
            // * select all that apply
            today: { active: false, label: 'today' },
            sinceYesterday: { active: false, label: 'since yesterday' },
            past2Days: { active: false, label: 'past 2 days' },
            past3Days: { active: false, label: 'past 3 days' },
            past4Days: { active: false, label: 'past 4 days' },
            past5Days: { active: false, label: 'past 5 days' },
            past6Days: { active: false, label: 'past 6 days' },
            pastWeek: { active: false, label: 'past week' },
            past2Weeks: { active: false, label: 'past 2 weeks' },
            past3Weeks: { active: false, label: 'past 3 weeks' },
            pastMonth: { active: false, label: 'past month' },
            past2Months: { active: false, label: 'past 2 months' },
            past3Months: { active: false, label: 'past 3 months' },
            past4Months: { active: false, label: 'past 4 months' },
            past5Months: { active: false, label: 'past 5 months' },
            past6Months: { active: false, label: 'past 6 months' },
            pastYear: { active: false, label: 'past year' },
        },
        employmentType: {
            // * will deselect others
            any: { active: true, label: 'any' },
            // * select all that apply
            fulltime: { active: false, label: 'full time' },
            parttime: { active: false, label: 'part time' },
            contract: { active: false, label: 'contract' },
            internship: { active: false, label: 'internship' },
        },
        remoteOptions: {
            // * will deselect others
            any: { active: true, label: 'any' },
            remoteOnly: { active: false, label: 'remote only' },
            excludeRemote: { active: false, label: 'exclude remote' },
            // * select all that apply
            onSite: { active: false, label: 'on site' },
            hybrid: { active: false, label: 'hybrid' },
            remote: { active: false, label: 'remote' },
        },
        salaryAnually: {
            // * will deselect others
            any: { active: true, label: 'any' },
            // * select all that apply
            notStatedOnJob: { active: false, label: 'not stated on job' },
            lessThan30kAYear: { active: false, label: 'less than $30k a year' },
            from30kTo44kAYear: { active: false, label: 'from $30k to $44k a year' },
            from45kTo60kAYear: { active: false, label: 'from $45k to $60k a year' },
            from61kTo80kAYear: { active: false, label: 'from $61k to $80k a year' },
            from81kTo100kAYear: { active: false, label: 'from $81k to $100k a year' },
            from101kTo120kAYear: { active: false, label: 'from $101k to $120k a year' },
            from121kTo150kAYear: { active: false, label: 'from $121k to $150k a year' },
            from151kTo180kAYear: { active: false, label: 'from $151k to $180k a year' },
            from181kTo210kAYear: { active: false, label: 'from $181k to $210k a year' },
            from211kTo250kAYear: { active: false, label: 'from $211k to $250k a year' },
            from251kTo280kAYear: { active: false, label: 'from $251k to $280k a year' },
            moreThan280kAYear: { active: false, label: 'more than $280k a year' },
        },
        rateHourly: {
            // * will deselect others
            any: { active: true, label: 'any' },
            // * select all that apply
            notStatedOnJob: { active: false, label: 'not stated on job' },
            lessThan15AHour: { active: false, label: 'less than $15 a Hour' },
            from15To30AHour: { active: false, label: 'from $15 to $30 a hour' },
            from31To45AHour: { active: false, label: 'from $31 to $45 a hour' },
            from46To60AHour: { active: false, label: 'from $46 to $60 a hour' },
            from61To80AHour: { active: false, label: 'from $61 to $80 a hour' },
            from81To100AHour: { active: false, label: 'from $81 to $100 a hour' },
            from101To120AHour: { active: false, label: 'from $101 to $120 a hour' },
            from121To150AHour: { active: false, label: 'from $121 to $150 a hour' },
            moreThan150AHour: { active: false, label: 'more than $150 a hour' },
        },
        skills: [
            // Allow for skills to be added with input bar
            { active: false, label: 'JavaScript' },
            { active: false, label: 'Vue' },
            { active: false, label: 'Python' },
            { active: false, label: 'React' },
            { active: false, label: 'Git' },
            { active: false, label: 'Tailwindcss' },
            { active: false, label: 'Django' },
        ],
        experienceRequired: {
            range: { min: 0, max: 10, value: 0, label: 'experience required'},
            // Only show when the range value is not equal to the range min
            includeJobsWithNoExperience: { active: false, label: 'include jobs with no requirements listed' }, 
        },
        excludedKeywords: [
            // Allow for keywords to be added with input bar
            // * Always keep `Java` in this list (cannot be deactivated)
            { active: true, label: 'Java' }, 
            // can be deactivated
            { active: false, label: 'Angular' }, 
            { active: false, label: 'PHP' }, 
        ],
        easyApply: { active: false, label: 'easy apply' },
        jobBoards: [
            { active: false, label: 'LinkedIn' }, 
            { active: false, label: 'Dice' }, 
            { active: false, label: 'Indeed' }, 
            { active: false, label: 'ZipRecruiter' }, 
            { active: false, label: 'Glassdoor' },
            // { active: false, label: 'TopTechJobs' },
            // { active: false, label: 'Angellist' },
        ]
    }),
    actions: {
        handleRadioButtonClick(group: FilterGroupsType | '', label: FilterLabelType | '', index: number) {
            if (!label.length) return;
            if (group.length) {
                const jobs = useJobsStore().jobs;

                switch (group) {
                    case 'postedDate':
                        const setAllPostedDates = (exludeLabel: PostedDateLabelType | '' = '', setState: boolean) => {
                            const keys = Object.keys(useFiltersStore().postedDate) as PostedDateLabelType[];
                            keys.forEach((key)  => {
                                if (exludeLabel.length && key !== exludeLabel) {
                                    this.postedDate[key].active = setState;
                                }
                            }, []);
                        }
                        let daysBack = 0;

                        switch (label) {
                            case 'any':
                                this.postedDate.any.active = !this.postedDate.any.active;
                                if (this.postedDate[label].active) setAllPostedDates('any', false); 
                                break;

                            case 'today':
                                this.postedDate.today.active = !this.postedDate.today.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 0;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'sinceYesterday':
                                this.postedDate.sinceYesterday.active = !this.postedDate.sinceYesterday.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 1;
                                    setAllPostedDates(label, false);
                                }
                                break;
                                
                            case 'past2Days':
                                this.postedDate.past2Days.active = !this.postedDate.past2Days.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 2;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past3Days':
                                this.postedDate.past3Days.active = !this.postedDate.past3Days.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 3;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past4Days':
                                this.postedDate.past4Days.active = !this.postedDate.past4Days.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 4;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past5Days':
                                this.postedDate.past5Days.active = !this.postedDate.past5Days.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 5;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past6Days':
                                this.postedDate.past6Days.active = !this.postedDate.past6Days.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 6;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'pastWeek':
                                this.postedDate.pastWeek.active = !this.postedDate.pastWeek.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 7;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past2Weeks':
                                this.postedDate.past2Weeks.active = !this.postedDate.past2Weeks.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 14;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past3Weeks':
                                this.postedDate.past3Weeks.active = !this.postedDate.past3Weeks.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 21;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'pastMonth':
                                this.postedDate.pastMonth.active = !this.postedDate.pastMonth.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 30;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past2Months':
                                this.postedDate.past2Months.active = !this.postedDate.past2Months.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 60;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past3Months':
                                this.postedDate.past3Months.active = !this.postedDate.past3Months.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 90;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past4Months':
                                this.postedDate.past4Months.active = !this.postedDate.past4Months.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 120;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past5Months':
                                this.postedDate.past5Months.active = !this.postedDate.past5Months.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 150;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'past6Months':
                                this.postedDate.past6Months.active = !this.postedDate.past6Months.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 180;
                                    setAllPostedDates(label, false);
                                }
                                break;

                            case 'pastYear':
                                this.postedDate.pastYear.active = !this.postedDate.pastYear.active;
                                if (this.postedDate[label].active) {
                                    daysBack = 365;
                                    setAllPostedDates(label, false);
                                }
                                break;
                        
                            default:
                                break;
                        }

                        if (!this.postedDate.today.active
                            && !this.postedDate.sinceYesterday.active
                            && !this.postedDate.past2Days.active
                            && !this.postedDate.past3Days.active
                            && !this.postedDate.past4Days.active
                            && !this.postedDate.past5Days.active
                            && !this.postedDate.past6Days.active
                            && !this.postedDate.pastWeek.active
                            && !this.postedDate.past2Weeks.active
                            && !this.postedDate.past3Weeks.active
                            && !this.postedDate.pastMonth.active
                            && !this.postedDate.past2Months.active
                            && !this.postedDate.past3Months.active
                            && !this.postedDate.past4Months.active
                            && !this.postedDate.past5Months.active
                            && !this.postedDate.past6Months.active
                            && !this.postedDate.pastYear.active
                        ) {
                            this.postedDate.any.active = true;
                            this.checkIfOtherFiltersAreActive();
                        } else {
                            this.postedDate.any.active = false;

                            // Calculate the comparison date
                            let comparisonDate = new Date();
                            comparisonDate.setDate(comparisonDate.getDate() - daysBack);
                            // console.log('jobs', jobs);
                            useJobsStore().filteredJobs = jobs.filter((job) => {
                                const jobDate = new Date(job.date_posted);
                                comparisonDate.setHours(0, 0, 0, 0); // Normalize the time part for comparison
                                jobDate.setHours(0, 0, 0, 0);
                                return jobDate >= comparisonDate;
                            });
                            
                            console.log('filteredJobs', useJobsStore().filteredJobs);
                            // jobsStore.setFilteredJobs();
                            this.handleFilterChange();
                        }
                        break;

                    case 'employmentType':
                        switch (label) {
                            case 'any':
                                this.employmentType.any.active = !this.employmentType.any.active;

                                if (this.employmentType.any.active) {
                                    this.employmentType.contract.active = false; 
                                    this.employmentType.fulltime.active = false; 
                                    this.employmentType.internship.active = false; 
                                    this.employmentType.parttime.active = false; 
                                }
                                break;

                            case 'contract':
                                this.employmentType.contract.active = !this.employmentType.contract.active;
                                break;

                            case 'fulltime':
                                this.employmentType.fulltime.active = !this.employmentType.fulltime.active;
                                break;

                            case 'internship':
                                this.employmentType.internship.active = !this.employmentType.internship.active;
                                break;

                            case 'parttime':
                                this.employmentType.parttime.active = !this.employmentType.parttime.active;
                                break;
                        
                            default:
                                break;
                        }

                        if (!this.employmentType.contract.active
                            && !this.employmentType.fulltime.active
                            && !this.employmentType.internship.active
                            && !this.employmentType.parttime.active
                        ) {
                            this.employmentType.any.active = true;
                            this.checkIfOtherFiltersAreActive();
                        } else {
                            this.employmentType.any.active = false;
                            this.handleFilterChange();
                        }
                        break;

                    case 'remoteOptions':
                        switch (label) {
                            case 'any':
                                this.remoteOptions.any.active = !this.remoteOptions.any.active;

                                this.remoteOptions.remoteOnly.active = false;
                                this.remoteOptions.excludeRemote.active = false;
                                this.remoteOptions.onSite.active = false;
                                this.remoteOptions.hybrid.active = false;
                                this.remoteOptions.remote.active = false;
                                break;
                        
                            case 'remoteOnly':
                                this.remoteOptions.remoteOnly.active = !this.remoteOptions.remoteOnly.active;

                                this.remoteOptions.any.active = false;
                                this.remoteOptions.excludeRemote.active = false;
                                this.remoteOptions.onSite.active = false;
                                this.remoteOptions.hybrid.active = false;
                                this.remoteOptions.remote.active = false;
                                break;
                        
                            case 'excludeRemote':
                                this.remoteOptions.excludeRemote.active = !this.remoteOptions.excludeRemote.active;
                               
                                this.remoteOptions.any.active = false;
                                this.remoteOptions.remoteOnly.active = false;
                                this.remoteOptions.onSite.active = false;
                                this.remoteOptions.hybrid.active = false;
                                this.remoteOptions.remote.active = false;
                                break;
                        
                            case 'onSite':
                                this.remoteOptions.onSite.active = !this.remoteOptions.onSite.active;
                                break;
                        
                            case 'hybrid':
                                this.remoteOptions.hybrid.active = !this.remoteOptions.hybrid.active;
                                break;
                        
                            case 'remote':
                                this.remoteOptions.remote.active = !this.remoteOptions.remote.active;
                                break;
                        
                            default:
                                break;
                        }

                        if (!this.remoteOptions.onSite.active
                            && !this.remoteOptions.hybrid.active
                            && !this.remoteOptions.remote.active
                            && !this.remoteOptions.remoteOnly.active
                            && !this.remoteOptions.excludeRemote.active
                        ) {
                            this.remoteOptions.any.active = true;
                            this.checkIfOtherFiltersAreActive();
                        } else if (this.remoteOptions.onSite.active
                            || this.remoteOptions.hybrid.active
                            || this.remoteOptions.remote.active) {
                            this.remoteOptions.any.active = false;
                            this.remoteOptions.remoteOnly.active = false;
                            this.remoteOptions.excludeRemote.active = false;
                        } else if (this.remoteOptions.any.active) {
                            this.handleFilterChange();
                        }
                        break;

                    case 'salaryAnually':
                        switch (label) {
                            case 'any':
                                this.salaryAnually.any.active = !this.salaryAnually.any.active;

                                if (this.salaryAnually.any.active) {
                                    this.salaryAnually.notStatedOnJob.active = false;
                                    this.salaryAnually.lessThan30kAYear.active = false;
                                    this.salaryAnually.from30kTo44kAYear.active = false;
                                    this.salaryAnually.from45kTo60kAYear.active = false;
                                    this.salaryAnually.from61kTo80kAYear.active = false;
                                    this.salaryAnually.from81kTo100kAYear.active = false;
                                    this.salaryAnually.from101kTo120kAYear.active = false;
                                    this.salaryAnually.from121kTo150kAYear.active = false;
                                    this.salaryAnually.from151kTo180kAYear.active = false;
                                    this.salaryAnually.from181kTo210kAYear.active = false;
                                    this.salaryAnually.from211kTo250kAYear.active = false;
                                    this.salaryAnually.from251kTo280kAYear.active = false;
                                    this.salaryAnually.moreThan280kAYear.active = false;
                                }
                                break;

                            case 'notStatedOnJob':
                                this.salaryAnually.notStatedOnJob.active = !this.salaryAnually.notStatedOnJob.active;
                                break;

                            case 'lessThan30kAYear':
                                this.salaryAnually.lessThan30kAYear.active = !this.salaryAnually.lessThan30kAYear.active;
                                break;

                            case 'from30kTo44kAYear':
                                this.salaryAnually.from30kTo44kAYear.active = !this.salaryAnually.from30kTo44kAYear.active;
                                break;

                            case 'from45kTo60kAYear':
                                this.salaryAnually.from45kTo60kAYear.active = !this.salaryAnually.from45kTo60kAYear.active;
                                break;

                            case 'from61kTo80kAYear':
                                this.salaryAnually.from61kTo80kAYear.active = !this.salaryAnually.from61kTo80kAYear.active;
                                break;

                            case 'from81kTo100kAYear':
                                this.salaryAnually.from81kTo100kAYear.active = !this.salaryAnually.from81kTo100kAYear.active;
                                break;

                            case 'from101kTo120kAYear':
                                this.salaryAnually.from101kTo120kAYear.active = !this.salaryAnually.from101kTo120kAYear.active;
                                break;

                            case 'from121kTo150kAYear':
                                this.salaryAnually.from121kTo150kAYear.active = !this.salaryAnually.from121kTo150kAYear.active;
                                break;

                            case 'from151kTo180kAYear':
                                this.salaryAnually.from151kTo180kAYear.active = !this.salaryAnually.from151kTo180kAYear.active;
                                break;

                            case 'from181kTo210kAYear':
                                this.salaryAnually.from181kTo210kAYear.active = !this.salaryAnually.from181kTo210kAYear.active;
                                break;

                            case 'from211kTo250kAYear':
                                this.salaryAnually.from211kTo250kAYear.active = !this.salaryAnually.from211kTo250kAYear.active;
                                break;

                            case 'from251kTo280kAYear':
                                this.salaryAnually.from251kTo280kAYear.active = !this.salaryAnually.from251kTo280kAYear.active;
                                break;

                            case 'moreThan280kAYear':
                                this.salaryAnually.moreThan280kAYear.active = !this.salaryAnually.moreThan280kAYear.active;
                                break;

                            default:
                                break;
                        }

                        if (!this.salaryAnually.notStatedOnJob.active
                            && !this.salaryAnually.lessThan30kAYear.active
                            && !this.salaryAnually.from30kTo44kAYear.active
                            && !this.salaryAnually.from45kTo60kAYear.active
                            && !this.salaryAnually.from61kTo80kAYear.active
                            && !this.salaryAnually.from81kTo100kAYear.active
                            && !this.salaryAnually.from101kTo120kAYear.active
                            && !this.salaryAnually.from121kTo150kAYear.active
                            && !this.salaryAnually.from151kTo180kAYear.active
                            && !this.salaryAnually.from181kTo210kAYear.active
                            && !this.salaryAnually.from211kTo250kAYear.active
                            && !this.salaryAnually.from251kTo280kAYear.active
                            && !this.salaryAnually.moreThan280kAYear.active
                        ) {
                            this.salaryAnually.any.active = true;
                            this.checkIfOtherFiltersAreActive();
                        } else {
                            this.salaryAnually.any.active = false;
                            this.handleFilterChange();
                        }
                        break;

                    case 'rateHourly':
                        switch (label) {
                            case 'any':
                                this.rateHourly.any.active = !this.rateHourly.any.active;
                                
                                if (this.rateHourly.any.active) {
                                    this.rateHourly.notStatedOnJob.active = false;
                                    this.rateHourly.lessThan15AHour.active = false;
                                    this.rateHourly.from15To30AHour.active = false;
                                    this.rateHourly.from31To45AHour.active = false;
                                    this.rateHourly.from46To60AHour.active = false;
                                    this.rateHourly.from61To80AHour.active = false;
                                    this.rateHourly.from81To100AHour.active = false;
                                    this.rateHourly.from101To120AHour.active = false;
                                    this.rateHourly.from121To150AHour.active = false;
                                    this.rateHourly.moreThan150AHour.active = false;
                                }
                                break;

                            case 'notStatedOnJob':
                                this.rateHourly.notStatedOnJob.active = !this.rateHourly.notStatedOnJob.active;
                                break;

                            case 'lessThan15AHour':
                                this.rateHourly.lessThan15AHour.active = !this.rateHourly.lessThan15AHour.active;
                                break;

                            case 'from15To30AHour':
                                this.rateHourly.from15To30AHour.active = !this.rateHourly.from15To30AHour.active;
                                break;

                            case 'from31To45AHour':
                                this.rateHourly.from31To45AHour.active = !this.rateHourly.from31To45AHour.active;
                                break;

                            case 'from46To60AHour':
                                this.rateHourly.from46To60AHour.active = !this.rateHourly.from46To60AHour.active;
                                break;

                            case 'from61To80AHour':
                                this.rateHourly.from61To80AHour.active = !this.rateHourly.from61To80AHour.active;
                                break;

                            case 'from81To100AHour':
                                this.rateHourly.from81To100AHour.active = !this.rateHourly.from81To100AHour.active;
                                break;

                            case 'from101To120AHour':
                                this.rateHourly.from101To120AHour.active = !this.rateHourly.from101To120AHour.active;
                                break;

                            case 'from121To150AHour':
                                this.rateHourly.from121To150AHour.active = !this.rateHourly.from121To150AHour.active;
                                break;

                            case 'moreThan150AHour':
                                this.rateHourly.moreThan150AHour.active = !this.rateHourly.moreThan150AHour.active;
                                break;

                            default:
                                break;
                        }

                        if (!this.rateHourly.notStatedOnJob.active
                            && !this.rateHourly.lessThan15AHour.active
                            && !this.rateHourly.from15To30AHour.active
                            && !this.rateHourly.from31To45AHour.active
                            && !this.rateHourly.from46To60AHour.active
                            && !this.rateHourly.from61To80AHour.active
                            && !this.rateHourly.from81To100AHour.active
                            && !this.rateHourly.from101To120AHour.active
                            && !this.rateHourly.from121To150AHour.active
                            && !this.rateHourly.moreThan150AHour.active
                        ) {
                            this.rateHourly.any.active = true;
                            this.checkIfOtherFiltersAreActive();
                        } else {
                            this.rateHourly.any.active = false;
                            this.handleFilterChange();
                        }
                        break;

                    case 'experienceRequired':
                        switch (label) {
                            case 'includeJobsWithNoExperience':
                                this.experienceRequired.includeJobsWithNoExperience.active = !this.experienceRequired.includeJobsWithNoExperience.active;
                                break;
                        
                            default:
                                break;
                        }
                        break;

                    default:
                        break;
                }
            } else if (index >= 0) {
                switch (label) {
                    case 'skills':
                        this.skills[index].active = !this.skills[index].active;
                        break;
                
                    case 'excludedKeywords':
                        if (this.excludedKeywords[index].label.includes('Java')
                            && this.excludedKeywords[index].label.toLowerCase() !== 'javascript'
                            && this.excludedKeywords[index].label.toLowerCase() !== 'java script') {
                            // * just a fancy way to show user that this btn cannot be unchecked
                            this.excludedKeywords[index].label = 'Java - i told u no java :)' 
                            const removeWord6 = () => setTimeout(() => {
                                this.excludedKeywords[index].label = 'Java'
                            }, 300);
                            const removeWord5 = () => setTimeout(() => {
                                this.excludedKeywords[index].label = 'Java -';
                                removeWord6();
                            }, 300);
                            const removeWord4 = () => setTimeout(() => {
                                this.excludedKeywords[index].label = 'Java - i';
                                removeWord5();
                            }, 300);
                            const removeWord3 = () => setTimeout(() => {
                                this.excludedKeywords[index].label = 'Java - i told';
                                removeWord4();
                            }, 300);
                            const removeWord2 = () => setTimeout(() => {
                                this.excludedKeywords[index].label = 'Java - i told u';
                                removeWord3();
                            }, 300);
                            const removeWord1 = () => setTimeout(() => {
                                this.excludedKeywords[index].label = 'Java - i told u no';
                                removeWord2();
                            }, 300);
                            setTimeout(() => {
                                this.excludedKeywords[index].label = 'Java - i told u no java';
                                removeWord1();
                            }, 1200);
                            break;
                        }
                        this.excludedKeywords[index].active = !this.excludedKeywords[index].active;
                        break;
                
                    case 'jobBoards':
                        this.jobBoards[index].active = !this.jobBoards[index].active;
                        break;
                
                    default:
                        break;
                }
            } else {
                switch (label) {
                    case 'easyApply':
                        this.easyApply.active = !this.easyApply.active ; 
                        break;
                }
            }
        },
        handleRangeInput(value: number = -1, group: RangeGroupType | '') {
            if (!group || value === -1) return;
            this[group].range.value = value;
        },
        checkIfOtherFiltersAreActive() {
            let skillsAreActive = false;
            this.skills.forEach(skill => { if (skill.active) skillsAreActive = true; })

            let excludedKeywordsAreActive = false;
            this.excludedKeywords.forEach(keyword => {
                if (keyword.label !== 'Java' && keyword.active) excludedKeywordsAreActive = true;
            })

            let jobBoardsAreActive = false;
            this.jobBoards.forEach(jobBoard => { if (jobBoard.active) jobBoardsAreActive = true; }) 

            if (this.postedDate.any.active
                && this.employmentType.any.active
                && this.remoteOptions.any.active
                && this.rateHourly.any.active
                && this.salaryAnually.any.active
                && !skillsAreActive
                && !excludedKeywordsAreActive
                && this.experienceRequired.range.value === this.experienceRequired.range.min
                && !this.easyApply.active
                && !jobBoardsAreActive) {
                // none of the filters are active (excluding search and location queries)
                this.areFiltersActive = false;
                // jobs should not be filtered
                useJobsStore().filteredJobs = [];
                return;
            } else {
                this.areFiltersActive = true;
                this.handleFilterChange();
            }
        },
        handleFilterChange() {
            // some filters are active (no need to check, but do handle the filters)
            // should set useJobsStore().filteredJobs with the filtered jobs from useJobsStore().jobs
        }
    }
});
