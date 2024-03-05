<template>
    <div class="filters-container">
        <h1 class="title">Select Filters</h1>
        <div class="searchbars">
            <input
                type="text"
                class="input keyword-search"
                placeholder="Search by job title, description, skills, and company"
                @input="(e: any) => handleKeywordSearch(e.target.value)"
            />
            <input
                type="text"
                class="input location-search"
                placeholder="Enter desired locations, separate by a comma"
                @input="(e: any) => handleLocationSearch(e.target.value)"
            />
        </div>
        <div class="filters">
            <div class="expanding-filter collapsed posted-date">
                <h2>
                    Posted Date
                    <span class="arrow">></span> 
                </h2>
                <div class="content">
                    <h5>will deselect other options if selected</h5>
                    <div class="radio-container any" :onClick="() => handleRadioButtonClick('postedDate', 'any')">
                        <input type="radio" :checked="postedDate.any.active" />
                        <p>{{ postedDate.any.label }}</p>
                    </div>
                    <h5>select all that apply</h5>
                    <div class="radio-container today" :onClick="() => handleRadioButtonClick('postedDate', 'today')">
                        <input type="radio" :checked="postedDate.today.active" />
                        <p>{{ postedDate.today.label }}</p>
                    </div>
                    <div class="radio-container since-yesterday" :onClick="() => handleRadioButtonClick('postedDate', 'sinceYesterday')">
                        <input type="radio" :checked="postedDate.sinceYesterday.active" />
                        <p>{{ postedDate.sinceYesterday.label }}</p>
                    </div>
                    <div class="radio-container past-2-days" :onClick="() => handleRadioButtonClick('postedDate', 'past2Days')">
                        <input type="radio" :checked="postedDate.past2Days.active" />
                        <p>{{ postedDate.past2Days.label }}</p>
                    </div>
                    <div class="radio-container past-3-days" :onClick="() => handleRadioButtonClick('postedDate', 'past3Days')">
                        <input type="radio" :checked="postedDate.past3Days.active" />
                        <p>{{ postedDate.past3Days.label }}</p>
                    </div>
                    <div class="radio-container past-4-days" :onClick="() => handleRadioButtonClick('postedDate', 'past4Days')">
                        <input type="radio" :checked="postedDate.past4Days.active" />
                        <p>{{ postedDate.past4Days.label }}</p>
                    </div>
                    <div class="radio-container past-5-days" :onClick="() => handleRadioButtonClick('postedDate', 'past5Days')">
                        <input type="radio" :checked="postedDate.past5Days.active" />
                        <p>{{ postedDate.past5Days.label }}</p>
                    </div>
                    <div class="radio-container past-6-days" :onClick="() => handleRadioButtonClick('postedDate', 'past6Days')">
                        <input type="radio" :checked="postedDate.past6Days.active" />
                        <p>{{ postedDate.past6Days.label }}</p>
                    </div>
                    <div class="radio-container past-week" :onClick="() => handleRadioButtonClick('postedDate', 'pastWeek')">
                        <input type="radio" :checked="postedDate.pastWeek.active" />
                        <p>{{ postedDate.pastWeek.label }}</p>
                    </div>
                    <div class="radio-container past-2-weeks" :onClick="() => handleRadioButtonClick('postedDate', 'past2Weeks')">
                        <input type="radio" :checked="postedDate.past2Weeks.active" />
                        <p>{{ postedDate.past2Weeks.label }}</p>
                    </div>
                    <div class="radio-container past-3-weeks" :onClick="() => handleRadioButtonClick('postedDate', 'past3Weeks')">
                        <input type="radio" :checked="postedDate.past3Weeks.active" />
                        <p>{{ postedDate.past3Weeks.label }}</p>
                    </div>
                    <div class="radio-container past-month" :onClick="() => handleRadioButtonClick('postedDate', 'pastMonth')">
                        <input type="radio" :checked="postedDate.pastMonth.active" />
                        <p>{{ postedDate.pastMonth.label }}</p>
                    </div>
                    <div class="radio-container past-2-months" :onClick="() => handleRadioButtonClick('postedDate', 'past2Months')">
                        <input type="radio" :checked="postedDate.past2Months.active" />
                        <p>{{ postedDate.past2Months.label }}</p>
                    </div>
                    <div class="radio-container past-3-months" :onClick="() => handleRadioButtonClick('postedDate', 'past3Months')">
                        <input type="radio" :checked="postedDate.past3Months.active" />
                        <p>{{ postedDate.past3Months.label }}</p>
                    </div>
                    <div class="radio-container past-4-months" :onClick="() => handleRadioButtonClick('postedDate', 'past4Months')">
                        <input type="radio" :checked="postedDate.past4Months.active" />
                        <p>{{ postedDate.past4Months.label }}</p>
                    </div>
                    <div class="radio-container past-5-months" :onClick="() => handleRadioButtonClick('postedDate', 'past5Months')">
                        <input type="radio" :checked="postedDate.past5Months.active" />
                        <p>{{ postedDate.past5Months.label }}</p>
                    </div>
                    <div class="radio-container past-6-months" :onClick="() => handleRadioButtonClick('postedDate', 'past6Months')">
                        <input type="radio" :checked="postedDate.past6Months.active" />
                        <p>{{ postedDate.past6Months.label }}</p>
                    </div>
                    <div class="radio-container past-year" :onClick="() => handleRadioButtonClick('postedDate', 'pastYear')">
                        <input type="radio" :checked="postedDate.pastYear.active" />
                        <p>{{ postedDate.pastYear.label }}</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed employment-type">
                <h2>
                    Employment Type
                    <span class="arrow">></span> 
                </h2>
                <div class="content">
                    <h5>will deselect other options if selected</h5>
                    <div class="radio-container any" :onClick="() => handleRadioButtonClick('employmentType', 'any')">
                        <input type="radio" :checked="employmentType.any.active" />
                        <p>{{ employmentType.any.label }}</p>
                    </div>
                    <h5>select all that apply</h5>
                    <div class="radio-container full-time" :onClick="() => handleRadioButtonClick('employmentType', 'fulltime')">
                        <input type="radio" :checked="employmentType.fulltime.active" />
                        <p>{{ employmentType.fulltime.label }}</p>
                    </div>
                    <div class="radio-container contract" :onClick="() => handleRadioButtonClick('employmentType', 'contract')">
                        <input type="radio" :checked="employmentType.contract.active" />
                        <p>{{ employmentType.contract.label }}</p>
                    </div>
                    <div class="radio-container parttime" :onClick="() => handleRadioButtonClick('employmentType', 'parttime')">
                        <input type="radio" :checked="employmentType.parttime.active" />
                        <p>{{ employmentType.parttime.label }}</p>
                    </div>
                    <div class="radio-container internship" :onClick="() => handleRadioButtonClick('employmentType', 'internship')">
                        <input type="radio" :checked="employmentType.internship.active" />
                        <p>{{ employmentType.internship.label }}</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed remote-options">
                <h2>
                    Remote Options
                    <span class="arrow">></span> 
                </h2>
                <div class="content">
                    <h5>will deselect other options if selected</h5>
                    <div class="radio-container any" :onClick="() => handleRadioButtonClick('remoteOptions', 'any')">
                        <input type="radio" :checked="remoteOptions.any.active" />
                        <p>{{ remoteOptions.any.label }}</p>
                    </div>
                    <div class="radio-container remote-only" :onClick="() => handleRadioButtonClick('remoteOptions', 'remoteOnly')">
                        <input type="radio" :checked="remoteOptions.remoteOnly.active" />
                        <p>{{ remoteOptions.remoteOnly.label }}</p>
                    </div>
                    <div class="radio-container exclude-remote" :onClick="() => handleRadioButtonClick('remoteOptions', 'excludeRemote')">
                        <input type="radio" :checked="remoteOptions.excludeRemote.active" />
                        <p>{{ remoteOptions.excludeRemote.label }}</p>
                    </div>
                    <h5>select all that apply</h5>
                    <div class="radio-container on-site" :onClick="() => handleRadioButtonClick('remoteOptions', 'onSite')">
                        <input type="radio" :checked="remoteOptions.onSite.active" />
                        <p>{{ remoteOptions.onSite.label }}</p>
                    </div>
                    <div class="radio-container remote" :onClick="() => handleRadioButtonClick('remoteOptions', 'remote')">
                        <input type="radio" :checked="remoteOptions.remote.active" />
                        <p>{{ remoteOptions.remote.label }}</p>
                    </div>
                    <div class="radio-container hybrid" :onClick="() => handleRadioButtonClick('remoteOptions', 'hybrid')">
                        <input type="radio" :checked="remoteOptions.hybrid.active" />
                        <p>{{ remoteOptions.hybrid.label }}</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed salary-$-annually">
                <h2>
                    Salary ($ annually)
                    <span class="arrow">></span> 
                </h2>
                <div class="content">
                    <h5>will deselect other options if selected</h5>
                    <div class="radio-container any" :onClick="() => handleRadioButtonClick('salaryAnually', 'any')">
                        <input type="radio" :checked="salaryAnually.any.active"/>
                        <p>{{ salaryAnually.any.label }}</p>
                    </div>
                    <h5>select all that apply</h5>
                    <div class="radio-container not-stated-on-job" :onClick="() => handleRadioButtonClick('salaryAnually', 'notStatedOnJob')">
                        <input type="radio" :checked="salaryAnually.notStatedOnJob.active"/>
                        <p>{{ salaryAnually.notStatedOnJob.label }}</p>
                    </div>
                    <div class="radio-container less-than-$30K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'lessThan30kAYear')">
                        <input type="radio" :checked="salaryAnually.lessThan30kAYear.active"/>
                        <p>{{ salaryAnually.lessThan30kAYear.label }}</p>
                    </div>
                    <div class="radio-container $30K-$44K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from30kTo44kAYear')">
                        <input type="radio" :checked="salaryAnually.from30kTo44kAYear.active"/>
                        <p>{{ salaryAnually.from30kTo44kAYear.label }}</p>
                    </div>
                    <div class="radio-container $45K-$60K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from45kTo60kAYear')">
                        <input type="radio" :checked="salaryAnually.from45kTo60kAYear.active"/>
                        <p>{{ salaryAnually.from45kTo60kAYear.label }}</p>
                    </div>
                    <div class="radio-container $61K-$80K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from61kTo80kAYear')">
                        <input type="radio" :checked="salaryAnually.from61kTo80kAYear.active"/>
                       <p>{{ salaryAnually.from61kTo80kAYear.label }}</p>
                    </div>
                    <div class="radio-container $81K-$100K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from81kTo100kAYear')">
                        <input type="radio" :checked="salaryAnually.from81kTo100kAYear.active"/>
                        <p>{{ salaryAnually.from81kTo100kAYear.label }}</p>
                    </div>
                    <div class="radio-container $101K-$120K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from101kTo120kAYear')">
                        <input type="radio" :checked="salaryAnually.from101kTo120kAYear.active"/>
                        <p>{{ salaryAnually.from101kTo120kAYear.label }}</p>
                    </div>
                    <div class="radio-container $121K-$150K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from121kTo150kAYear')">
                        <input type="radio" :checked="salaryAnually.from121kTo150kAYear.active"/>
                        <p>{{ salaryAnually.from121kTo150kAYear.label }}</p>
                    </div>
                    <div class="radio-container $151K-$180K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from151kTo180kAYear')">
                        <input type="radio" :checked="salaryAnually.from151kTo180kAYear.active"/>
                        <p>{{ salaryAnually.from151kTo180kAYear.label }}</p>
                    </div>
                    <div class="radio-container $181K-$210K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from181kTo210kAYear')">
                        <input type="radio" :checked="salaryAnually.from181kTo210kAYear.active"/>
                        <p>{{ salaryAnually.from181kTo210kAYear.label }}</p>
                    </div>
                    <div class="radio-container $211K-$250K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from211kTo250kAYear')">
                        <input type="radio" :checked="salaryAnually.from211kTo250kAYear.active"/>
                        <p>{{ salaryAnually.from211kTo250kAYear.label }}</p>
                    </div>
                    <div class="radio-container $251K-$280K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'from251kTo280kAYear')">
                        <input type="radio" :checked="salaryAnually.from251kTo280kAYear.active"/>
                        <p>{{ salaryAnually.from251kTo280kAYear.label }}</p>
                    </div>
                    <div class="radio-container more-than-$280K-year" :onClick="() => handleRadioButtonClick('salaryAnually', 'moreThan280kAYear')">
                        <input type="radio" :checked="salaryAnually.moreThan280kAYear.active"/>
                        <p>{{ salaryAnually.moreThan280kAYear.label }}</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed rate-$-hourly">
                <h2>
                    Rate ($ hourly)
                   <span class="arrow">></span> 
                </h2>
                <div class="content">
                    <h5>will deselect other options if selected</h5>
                    <div class="radio-container any" :onClick="() => handleRadioButtonClick('rateHourly', 'any')">
                        <input type="radio" :checked="rateHourly.any.active" />
                        <p>{{ rateHourly.any.label }}</p>
                    </div>
                    <h5>select all that apply</h5>
                    <div class="radio-container below-$15-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'lessThan15AHour')">
                        <input type="radio" :checked="rateHourly.lessThan15AHour.active" />
                        <p>{{ rateHourly.lessThan15AHour.label }}</p>
                    </div>
                    <div class="radio-container $15-$30-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'from15To30AHour')">
                        <input type="radio" :checked="rateHourly.from15To30AHour.active" />
                        <p>{{ rateHourly.from15To30AHour.label }}</p>
                    </div>
                    <div class="radio-container $31-$45-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'from31To45AHour')">
                        <input type="radio" :checked="rateHourly.from31To45AHour.active" />
                        <p>{{ rateHourly.from31To45AHour.label }}</p>
                    </div>
                    <div class="radio-container $46-$60-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'from46To60AHour')">
                        <input type="radio" :checked="rateHourly.from46To60AHour.active" />
                        <p>{{ rateHourly.from46To60AHour.label }}</p>
                    </div>
                    <div class="radio-container $61-$80-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'from61To80AHour')">
                        <input type="radio" :checked="rateHourly.from61To80AHour.active" />
                        <p>{{ rateHourly.from61To80AHour.label }}</p>
                    </div>
                    <div class="radio-container $81-$100-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'from81To100AHour')">
                        <input type="radio" :checked="rateHourly.from81To100AHour.active" />
                        <p>{{ rateHourly.from81To100AHour.label }}</p>
                    </div>
                    <div class="radio-container $101-$120-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'from101To120AHour')">
                        <input type="radio" :checked="rateHourly.from101To120AHour.active" />
                        <p>{{ rateHourly.from101To120AHour.label }}</p>
                    </div>
                    <div class="radio-container $121-$150-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'from121To150AHour')">
                        <input type="radio" :checked="rateHourly.from121To150AHour.active" />
                        <p>{{ rateHourly.from121To150AHour.label }}</p>
                    </div>
                    <div class="radio-container above-$150-hour" :onClick="() => handleRadioButtonClick('rateHourly', 'moreThan150AHour')">
                        <input type="radio" :checked="rateHourly.moreThan150AHour.active" />
                        <p>{{ rateHourly.moreThan150AHour.label }}</p>
                    </div>
                </div> 
            </div>
            <div class="expanding-filter collapsed experience-required">
                <h2>
                    Experience Required
                    <span class="arrow">></span> 
                </h2>
                <div class="content">
                    <div class="range-container">
                        <div 
                            class="range-value"
                            v-if="experienceRequired.range.value === experienceRequired.range.min"
                        >no experience required</div>
                        <div
                            class="range-value"
                            v-if="experienceRequired.range.value !== experienceRequired.range.min"
                        >{{ experienceRequired.range.value }}+ years required</div>
                        <input
                            class="range-input"
                            type="range"
                            :min="experienceRequired.range.min"
                            :max="experienceRequired.range.max"
                            v-on:input="(e: any) => handleRangeInput(e, 'experienceRequired')"
                            :value="experienceRequired.range.value"
                        />
                        <div class="range-labels">
                            <span class="min">{{ experienceRequired.range.min }} yrs</span>
                            <span class="max">{{ experienceRequired.range.max }}+ yrs</span>
                        </div>
                    </div>
                    <div
                        :class="`radio-container excluded-keyword ${experienceRequired.range.value === experienceRequired.range.min ? 'disabled' : ''}`"
                        :onClick="() => experienceRequired.range.value === experienceRequired.range.min ? null : handleRadioButtonClick('experienceRequired', 'includeJobsWithNoExperience')"
                    >
                        <input type="radio" :checked="experienceRequired.includeJobsWithNoExperience.active" :disabled="experienceRequired.range.value === experienceRequired.range.min" />
                        <p>{{ experienceRequired.includeJobsWithNoExperience.label }}</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed skills">
                <h2>
                    Skills
                   <span class="arrow">></span> 
                </h2>
                <div class="content" v-if="skills">
                    <!-- * make input into separate component (re-use for excluded keywords filter) -->
                    <input type="text" class="skill-input" /> 
                    <div 
                        v-for="(skill, i) in skills"
                        :key="i"
                        class="radio-container skill"
                        :onClick="() => handleRadioButtonClick('', 'skills', i)"
                    >
                        <input type="radio" :checked="skill.active" />
                        <p>{{ skill.label }}</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed excluded-keywords">
                <h2>
                    Excluded Keywords
                    <span class="arrow">></span> 
                </h2>
                <div class="content" v-if="excludedKeywords">
                    <input type="text" class="excluded-keyword-input" />
                    <div
                        v-for="(keyword, i) in excludedKeywords"
                        :key="i"
                        class="radio-container excluded-keyword"
                        :onClick="() => canClickKeyword(i) ? handleRadioButtonClick('', 'excludedKeywords', i) : null"
                    >
                        <input type="radio" :checked="keyword.active" />
                        <p>{{ keyword.label }}</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed job-board">
                <h2>
                    Job Board
                    <span class="arrow">></span> 
                </h2>
                <div class="content" v-if="jobBoards">
                    <div 
                        v-for="(jobBoard, i) in jobBoards" 
                        :key="i"
                        class="radio-container jobs-board"
                        :onClick="() => handleRadioButtonClick('', 'jobBoards', i)"
                    >
                        <input type="radio" :checked="jobBoard.active" />
                        <p>{{ jobBoard.label }}</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed easy-apply">
                <h2>
                    Easy Apply
                    <span class="arrow">></span> 
                </h2>
                <div class="content">
                    <div class="radio-container easy-apply" :onClick="() => handleRadioButtonClick('', 'easyApply')">
                        <input type="radio" :checked="easyApply.active" />
                        <p>{{ easyApply.label }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useJobsStore } from "@/stores/jobs";
import { useFiltersStore } from "@/stores/filters";
import { FilterGroupsType, FilterLabelType, RangeGroupType } from '@/types/Filters';
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
    name: "FiltersComponent",
    computed: {
        ...mapState(useFiltersStore, ['postedDate']),
        ...mapState(useFiltersStore, ['employmentType']),
        ...mapState(useFiltersStore, ['remoteOptions']),
        ...mapState(useFiltersStore, ['salaryAnually']),
        ...mapState(useFiltersStore, ['rateHourly']),
        ...mapState(useFiltersStore, ['skills']),
        ...mapState(useFiltersStore, ['experienceRequired']),
        ...mapState(useFiltersStore, ['excludedKeywords']),
        ...mapState(useFiltersStore, ['easyApply']),
        ...mapState(useFiltersStore, ['jobBoards']),
    },
    data() {
        return {
            javaKeywordClicked: false,
        }
    },
    mounted() {
        document.addEventListener('DOMContentLoaded', function () {
            const filters = document.querySelectorAll('.expanding-filter');

            filters.forEach(function (filter) {
                filter?.addEventListener('click', function (e) {
                    const expanderEle: any = e?.target || null;
                    const expander = expanderEle?.childNodes || [];
                    // console.log('expander', expander);

                    if (filter.classList.contains('collapsed')) {
                        filter.classList.remove('collapsed');
                        filter.classList.add('expanded');
                    } else if (expander.length
                        && (expander[0].textContent === '>' // clicked on arrow
                        || !expander[0].firstChild // clicked on space between text and arrow
                        && !expander[0].lastChild
                        && expander[1]
                        && expander[1].innerText === '>'
                        )
                    ) {
                        filter.classList.remove('expanded');
                        filter.classList.add('collapsed');
                    }
                });
            });
        });
    },
    methods: {
        handleKeywordSearch(text: string) {
            useJobsStore().setSearchQueryAndFilter(text);
        },
        handleLocationSearch(text: string) {
            useJobsStore().setLocationQueryAndFilter(text);
        },
        handleRadioButtonClick(group: FilterGroupsType | '', label: FilterLabelType | '', index: number = -1) {
            useFiltersStore().handleRadioButtonClick(group, label, index);
        },
        handleRangeInput(e: any, group: RangeGroupType | '') {
            useFiltersStore().handleRangeInput(Number(e.target.value), group);
        },
        canClickKeyword(index: number) {
            if (index > 0) return true;
            if (!this.javaKeywordClicked) { // is the java keyword to exclude and hasn't been clicked in past t seconds
                this.javaKeywordClicked = true;
                setTimeout(() => this.javaKeywordClicked = false, 3000);
                return true;
            }
            return false;
        }
    }
})
</script>

<style scoped lang="scss">
.filters-container {
    margin-left: 6vw;

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        font-size: 2em;
        font-weight: 300;
        height: 6vh;
    }

    .searchbars {
        display: flex;
        flex-direction: column;

        .input {
            margin-bottom: 12px;
            border: 1px solid #486071;
            height: 30px;
            padding: 6px;
            font-size: medium;
            font-weight: 300;
            font-family: 'Palantino';
            transition: 0.2s ease-in-out; 

            &:hover {
                box-shadow: -3px 2px 4px 0px #486071;
            }

            &:focus {
                box-shadow: -3px 2px 4px 0px #f66d65;
                border-color: #f66d65;
                outline: 1px solid #f66d65;
            }
        }
    
        .keyword-search {

        }

        .location-search {

        }
    }

    .filters {
        position: sticky;
        top: 0;
        left: 0;
        border-left: 1px solid #486071;
        width: 30vw;
        max-height: 48vh;
        height: fit-content;
        overflow-y: auto;
        overflow-x: hidden;
        transition: 0.2s ease-in-out; 
        box-shadow: inset 3px -12px 12px -12px #486071;
        scroll-behavior: smooth;
        padding-bottom: 5em;

        @media (max-width: 800px) {
            min-height: 42vh;
            margin-bottom: 6%;
            min-width: 80%;
        }

        .expanding-filter {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
            height: fit-content;
            min-height: 5em;
            cursor: pointer;
            border-bottom: 1px solid #486071;
            transition: 0.2s ease-in-out;
            font-weight: 300;

            &:hover {
                border-color: #f66d65;
            }

            &:hover > h2 {
                color: #f66d65;
            }

            &:hover > h2 > .arrow {
                color: #f66d65;
            }

            &:hover > .content {
                border-color: #f66d65;
            }

            h2 {
                user-select: none;
                font-size: 1.5em;
                font-weight: 600;
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                width: inherit;
                color: #486071;
                margin: 0;
                margin-left: 30px;
                transition: 0.15s ease-in-out;
                
                .arrow {
                    user-select: none;
                    transition: 0.2s ease-in-out;
                    margin: 0;
                    margin-right: 51px;
                    padding: 1px 6px;
                    border-radius: 30px;
                    color: #486071;
                }
            }

            .content {
                width: 100%;
                flex-direction: column;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding-left: 10%;
                padding-top: 21px;
                padding-bottom: 21px;
                border-top: 1px dashed #486071;

                .range-container {
                    width: 75%;
                    margin-left: 9%;
                    margin-top: 21px;
                    margin-bottom: 21px;
                    display: flex;
                    flex-direction: column;

                    .range-value {
                        width: 75%;
                        margin-bottom: 12px; 
                        border: 1px solid rgba(72, 96, 113, 0.81);
                        padding: 6px;
                    }

                    .range-input {
                        margin-bottom: 12px;
                        font-size: medium;
                        font-weight: 300;
                        font-family: 'Palantino';
                        transition: 0.2s ease-in-out; 
                        width: 75%;

                        // &:hover {
                        // }

                        // &:focus {
                        // }
                    }

                    .range-labels {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 75%;
                        padding: 0 6px;

                        .min {
    
                        }
    
                        .max {
    
                        }
                    }
                }

                .radio-container {
                    margin-left: 6%;
                    display: flex;
                    width: 75%;
                    align-items: center;
                    height: 21px;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 9px;
                    user-select: none;

                    &:hover {
                        background-color: rgba(246, 108, 101, 0.81);
                    }

                    input {
                        margin-right: 10px;
                    }
                }

                .disabled {
                    opacity: 0.3;

                    &:hover {
                        background-color: transparent;
                    }
                }
            }
        }

        .collapsed {

            h2 {
                
                .arrow {
                    transform: rotate(90deg);
                }
            }
        }

        .expanded {

            h2 {
                height: 3.3em;
                
                .arrow {
                    transform: rotate(-90deg);
                }
            }
        }

        .collapsed .content {
            display: none;
        }

        .expanded .content {
            display: flex;
        }
    }
}
</style>
