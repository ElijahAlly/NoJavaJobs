type RadioType = {
    active: boolean
    label: string
}

type RangeType = {
    min: number
    max: number
    value: number
    label: string
}

export type FilterType = {
    areFiltersActive: boolean
    postedDate: {
        // * will deselect others
        any: RadioType
        // * select all that apply
        today: RadioType
        sinceYesterday: RadioType
        past2Days: RadioType
        past3Days: RadioType
        past4Days: RadioType
        past5Days: RadioType
        past6Days: RadioType
        pastWeek: RadioType
        past2Weeks: RadioType
        past3Weeks: RadioType
        pastMonth: RadioType
        past2Months: RadioType
        past3Months: RadioType
        past4Months: RadioType
        past5Months: RadioType
        past6Months: RadioType
        pastYear: RadioType
    },
    employmentType: {
        // * will deselect others
        any: RadioType
        // * select all that apply
        fulltime: RadioType
        contract: RadioType
        parttime: RadioType
        internship: RadioType
        // undefined: undefined
        // parttime, fulltime
        // parttime, contract
        // fulltime, contract
    },   
    remoteOptions: {
        // * will deselect others
        any: RadioType
        remoteOnly: RadioType
        excludeRemote: RadioType
        // * select all that apply
        onSite: RadioType
        hybrid: RadioType
        remote: RadioType
    },
    salaryAnually: {
        // * will deselect others
        any: RadioType
        // * select all that apply
        notStatedOnJob: RadioType
        lessThan30kAYear: RadioType
        from30kTo44kAYear: RadioType
        from45kTo60kAYear: RadioType
        from61kTo80kAYear: RadioType
        from81kTo100kAYear: RadioType
        from101kTo120kAYear: RadioType
        from121kTo150kAYear: RadioType
        from151kTo180kAYear: RadioType
        from181kTo210kAYear: RadioType
        from211kTo250kAYear: RadioType
        from251kTo280kAYear: RadioType
        moreThan280kAYear: RadioType
    },
    rateHourly: {
        // * will deselect others
        any: RadioType
        // * select all that apply
        notStatedOnJob: RadioType
        lessThan15AHour: RadioType 
        from15To30AHour: RadioType 
        from31To45AHour: RadioType 
        from46To60AHour: RadioType 
        from61To80AHour: RadioType 
        from81To100AHour: RadioType 
        from101To120AHour: RadioType 
        from121To150AHour: RadioType 
        moreThan150AHour: RadioType 
    },
    skills: RadioType[],
    experienceRequired: {
        range: RangeType
        includeJobsWithNoExperience: RadioType
    },
    excludedKeywords: RadioType[],
    easyApply: RadioType,
    jobBoards: RadioType[]
}

export type PostedDateLabelType = (
    'any'
    | 'today'
    | 'sinceYesterday'
    | 'past2Days'
    | 'past3Days'
    | 'past4Days'
    | 'past5Days'
    | 'past6Days'
    | 'pastWeek'
    | 'past2Weeks'
    | 'past3Weeks'
    | 'pastMonth'
    | 'past2Months'
    | 'past3Months'
    | 'past4Months'
    | 'past5Months'
    | 'past6Months'
    | 'pastYear'
)

type EmploymentTypeLabelType = (
    'fulltime'
    | 'contract'
    | 'parttime'
    | 'internship' 
)

type RemoteOptionsLabelType = (
    'any'
    | 'remoteOnly'
    | 'excludeRemote'
    | 'onSite' 
    | 'hybrid' 
    | 'remote' 
)

type SalaryAnuallyLabelType = (
    'any'
    | 'notStatedOnJob' 
    | 'lessThan30kAYear' 
    | 'from30kTo44kAYear' 
    | 'from45kTo60kAYear' 
    | 'from61kTo80kAYear' 
    | 'from81kTo100kAYear' 
    | 'from101kTo120kAYear' 
    | 'from121kTo150kAYear' 
    | 'from151kTo180kAYear' 
    | 'from181kTo210kAYear' 
    | 'from211kTo250kAYear' 
    | 'from251kTo280kAYear' 
    | 'moreThan280kAYear' 
)

type RateHourlyLabelType = (
    'any'
    | 'notStatedOnJob' 
    | 'lessThan15AHour' 
    | 'from15To30AHour' 
    | 'from31To45AHour' 
    | 'from46To60AHour' 
    | 'from61To80AHour' 
    | 'from81To100AHour' 
    | 'from101To120AHour' 
    | 'from121To150AHour' 
    | 'moreThan150AHour' 
)

type SkillsLabelType = 'skills'

type ExperienceRequiredLabelType = (
    'range'
    | 'includeJobsWithNoExperience'
)

type ExcludedKeywordsLabelType = 'excludedKeywords'

type EasyApplyLabelType = 'easyApply'

type JobBoardsLabelType = 'jobBoards'

export type FilterLabelType = (
    'any'
    | PostedDateLabelType
    | EmploymentTypeLabelType
    | RemoteOptionsLabelType
    | SalaryAnuallyLabelType
    | RateHourlyLabelType
    | SkillsLabelType
    | ExperienceRequiredLabelType
    | ExcludedKeywordsLabelType
    | EasyApplyLabelType
    | JobBoardsLabelType
)

export type FilterGroupsType = (
    'postedDate'
    | 'employmentType'
    | 'remoteOptions'
    | 'salaryAnually'
    | 'rateHourly'
    | 'experienceRequired'
)

export type RangeGroupType = (
   'experienceRequired'
)