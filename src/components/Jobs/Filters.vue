<template>
    <div class="filters-container">
        <h1 class="title">Select Filters</h1>
        <div class="filters">
            <div class="searchbars">
                <input
                    type="text"
                    class="keyword-search"
                    placeholder="search name, description, skills, and company in jobs"
                />
                <input
                    type="text"
                    class="location-search"
                    placeholder="define location(s) of jobsite, separate by comma"
                />
            </div>
            <div class="expanding-filter collapsed posted-date">
                <h2>
                    Posted Date
                    <span class="arrow">></span>
                </h2>
                <div class="content">
                    <h5>will deselect other options if selected</h5>
                    <div class="radio-container any">
                        <input type="radio" />
                        <p>any</p>
                    </div>
                    <h5>select all that apply</h5>
                    <div class="radio-container today">
                        <input type="radio" />
                        <p>today</p>
                    </div>
                    <div class="radio-container since-yesterday">
                        <input type="radio" />
                        <p>since yesterday</p>
                    </div>
                    <div class="radio-container past-2-days">
                        <input type="radio" />
                        <p>past 2 days</p>
                    </div>
                    <div class="radio-container past-3-days">
                        <input type="radio" />
                        <p>past 3 days</p>
                    </div>
                    <div class="radio-container past-4-days">
                        <input type="radio" />
                        <p>past 4 days</p>
                    </div>
                    <div class="radio-container past-5-days">
                        <input type="radio" />
                        <p>past 5 days</p>
                    </div>
                    <div class="radio-container past-6-days">
                        <input type="radio" />
                        <p>past 6 days</p>
                    </div>
                    <div class="radio-container past-week">
                        <input type="radio" />
                        <p>past week</p>
                    </div>
                    <div class="radio-container past-2-weeks">
                        <input type="radio" />
                        <p>past 2 weeks</p>
                    </div>
                    <div class="radio-container past-3-weeks">
                        <input type="radio" />
                        <p>past 3 weeks</p>
                    </div>
                    <div class="radio-container past-month">
                        <input type="radio" />
                        <p>past month</p>
                    </div>
                    <div class="radio-container past-2-months">
                        <input type="radio" />
                        <p>past 2 months</p>
                    </div>
                    <div class="radio-container past-3-months">
                        <input type="radio" />
                        <p>past 3 months</p>
                    </div>
                    <div class="radio-container past-4-months">
                        <input type="radio" />
                        <p>past 4 months</p>
                    </div>
                    <div class="radio-container past-5-months">
                        <input type="radio" />
                        <p>past 5 months</p>
                    </div>
                    <div class="radio-container past-6-months">
                        <input type="radio" />
                        <p>past 6 months</p>
                    </div>
                    <div class="radio-container past-year">
                        <input type="radio" />
                        <p>past year</p>
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
                    <div class="any">any</div>
                    <h5>select all that apply</h5>
                    <div class="full-time">
                        <input type="radio" />
                        <p>full time</p>
                    </div>
                    <div class="contract">
                        <input type="radio" />
                        <p>contract</p>
                    </div>
                    <div class="contract-&-full-time">
                        <input type="radio" />
                        <p>contract & full time</p>
                    </div>
                    <div class="part-time-temporary-seasonal">
                        <input type="radio" />
                        <p>part time, temporary, & seasonal</p>
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
                    <div class="any">
                        <input type="radio" />
                        <p>any</p> 
                    </div>
                    <div class="remote-only">
                        <input type="radio" />
                        <p>remote only</p>
                    </div>
                    <div class="exclude-remote">
                        <input type="radio" />
                        <p>exclude remote</p>
                    </div>
                    <h5>select all that apply</h5>
                    <div class="on-site">
                        <input type="radio" />
                        <p>on site</p>
                    </div>
                    <div class="remote">
                        <input type="radio" />
                        <p>remote</p>
                    </div>
                    <div class="hybrid">
                        <input type="radio" />
                        <p>hybrid</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed salary-$-annually">
                <h2>
                    Salary ($ annually)
                    <span class="arrow">></span>
                </h2>
                <div class="content">
                    <div class="select-all">
                        <input type="radio" />
                        <p>select all</p>
                    </div>
                    <div class="deselect-all">
                        <input type="radio" />
                        <p>deselect all</p>
                    </div>
                    <h5>select all that apply</h5>
                    <div class="not-stated-on-job">
                        <input type="radio" />
                        <p>not stated on job</p> 
                    </div>
                    <div class="less-than-$30K-year"></div>
                    <div class="$30K-$44K-year"></div>
                    <div class="$45K-$60K-year"></div>
                    <div class="$60K-$80K-year"></div>
                    <div class="$80K-$100K-year"></div>
                    <div class="$100K-$120K-year"></div>
                    <div class="$120K-$140K-year"></div>
                    <div class="$140K-$160K-year"></div>
                    <div class="$160K-$180K-year"></div>
                    <div class="$180K-$200K-year"></div>
                    <div class="$200K-$240K-year"></div>
                    <div class="$240K-$280K-year"></div>
                    <div class="more-than-$280K-year"></div>
                </div>
            </div>
            <div class="expanding-filter collapsed rate-$-hourly">
                <h2>
                    Rate ($ hourly)
                    <span class="arrow">></span>
                </h2>
                <div class="content">
                    <div>select all</div>
                    <div>deselect all</div>
                    <h5>select all that apply</h5>
                    <div class="not-stated-on-job"></div>
                    <div class="below-$15-hour"></div>
                    <div class="$15-$30-hour"></div>
                    <div class="$30-$45-hour"></div>
                    <div class="$45-$60-hour"></div>
                    <div class="$60-$75-hour"></div>
                    <div class="$75-$100-hour"></div>
                    <div class="$100-$120-hour"></div>
                    <div class="$120-$150-hour"></div>
                    <div class="above-$150-hour"></div>
                </div> 
            </div>
            <div class="expanding-filter collapsed skills">
                <h2>
                    Skills
                    <span class="arrow">></span>
                </h2>
                <div class="content">
                    <input type="text" class="skill-input" />
                    <ul class="skills-list">
                        <li class="skill"></li>
                    </ul>
                </div>
            </div>
            <div class="expanding-filter collapsed experience-required">
                <h2>
                    Experience Required
                    <span class="arrow">></span>
                </h2>
                <div class="content">
                    <!-- slider input: 0-10+ -->
                    <input type="range" min="0" max="10"/>
                    <div>
                        <input type="radio" />
                        <p>include jobs with no experience listed</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed excluded-keywords">
                <h2>
                    Excluded Keywords
                    <span class="arrow">></span>
                </h2>
                <div class="content">
                    <input type="text" class="excluded-keyword-input" />
                    <ul class="excluded-keywords-list">
                        <li class="excluded-keyword"></li>
                    </ul>
                </div>
            </div>
            <div class="expanding-filter collapsed -filters">
                <h2>
                     Filters
                    <span class="arrow">></span>
                </h2>
                <div class="content">
                    <div>
                        <input type="radio" class="easy-apply" />
                        <p>easy apply</p>
                    </div>
                </div>
            </div>
            <div class="expanding-filter collapsed wellfound-filters">
                <h2>
                    Wellfound Filters
                    <span class="arrow">></span>
                </h2>
                <div class="content">
                    <div class="markets">
                        
                    </div>
                    <div class="investment-stage">
                        
                    </div>
                    <div class="equity">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Filters",
    // props: {

    // },
})

document.addEventListener('DOMContentLoaded', function () {
    const filters = document.querySelectorAll('.expanding-filter');

    filters.forEach(function (filter) {
        const header = filter.querySelector('h2');
        header?.addEventListener('click', function () {
            if (filter.classList.contains('collapsed')) {
                filter.classList.remove('collapsed');
                filter.classList.add('expanded');
            } else {
                filter.classList.remove('expanded');
                filter.classList.add('collapsed');
            }
        });
    });
});
</script>

<style scoped lang="scss">
.filters-container {
    .title {
        font-size: 2em;
        font-weight: 300;
    }

    .filters {
        position: sticky;
        top: 0;
        left: 0;
        border: 1px solid #486071;
        width: 30vw;
        max-height: 60vh;
        height: fit-content;
        overflow-y: auto;
        overflow-x: hidden;
        
        &:hover {
            box-shadow: -4px 3px 6px 0px #486071;
        }

        @media (max-width: 800px) {
            min-height: 42vh;
            margin-bottom: 6%;
            min-width: 80%;
        }

        .expanding-filter {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: inherit;
            height: fit-content;
            cursor: pointer;
            margin-top: 30px;
            border-bottom: 1px solid #486071;
            transition: 0.2s ease-in-out;
            font-weight: 300;

            h2 {
                user-select: none;
                font-size: 1.2em;
                font-weight: 300;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: inherit;
                color: #486071;
                margin: 0;
                margin-left: 30px;
                transition: 0.2s ease-in-out;

                &:hover {
                    color: #f66d65;
                }
                
                .arrow {
                    user-select: none;
                    transition: 0.2s ease-in-out;
                    margin: 0;
                    margin-right: 51px;
                }
            }

            .content {
                width: inherit;
                flex-direction: column;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding-left: 10%;
                border-top: 1px dashed #486071;
                
                .radio-container {
                    padding-left: 6%;
                    display: flex;
                    width: 100%;
                    align-items: center;
                    height: 21px;

                    input {
                        margin-right: 10px;
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
