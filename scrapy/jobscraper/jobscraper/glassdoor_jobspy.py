import pandas as pd
from jobspy import scrape_jobs
from datetime import datetime
from tqdm import tqdm
import time
import threading
from pipeline_util import closeOutScraperHelper, CYAN, RESET

# Global variable to control the timer
timer_running = True

def background_timer(start_time):
    while timer_running:
        elapsed_time = datetime.now() - start_time
        # Format elapsed time to a string in the format of hours:minutes:seconds
        elapsed_str = str(elapsed_time).split('.')[0]
        print(f"\r{CYAN}Elapsed Time: {elapsed_str}{RESET}", end='')
        time.sleep(1)

start_time = datetime.now() # used to calculate total elapsed time when finished
traversed_pages_count = 0
scraped_jobs_count = 0
excluded_jobs_count = 0

# Start the background timer
timer_thread = threading.Thread(target=background_timer, args=(start_time,))
timer_thread.start()

results_wanted = 99
search_term = "software engineer"
jobs = scrape_jobs(
    site_name=["glassdoor"], # "indeed", "linkedin", "zip_recruiter"
    search_term=search_term,
    results_wanted=results_wanted,
    full_description=True # fetches full description for Indeed / LinkedIn (much slower) 
)
# Options:
# location="Dallas, TX",
# distance (int): in miles
# job_type (enum): fulltime, parttime, internship, contract
# proxy (str): in format 'http://user:pass@host:port' or [https, socks]
# is_remote (bool)
# results_wanted (int): number of job results to retrieve for each site specified in 'site_type'
# easy_apply (bool): filters for jobs that are hosted on the job board site
# linkedin_company_ids (list[int): searches for linkedin jobs with specific company ids
# country_indeed (enum): filters the country on Indeed (see below for correct spelling)
# offset (num): starts the search from an offset (e.g. 25 will start the search from the 25th result)
# country_indeed='USA', # only needed for indeed / glassdoor

keywords = ['java', 'angular', 'php'] # keywords to filter out (case does not matter, see case=False in str.contains below)

for keyword in tqdm(keywords, desc="Filtering jobs mentioning java...", colour='blue'):
    pattern = rf'\b{keyword}\b'

    before_filtering = len(jobs)

    # Filter the DataFrame using the regular expression for whole word match
    # The `na=False` parameter is used to handle NaN values in the 'description' column
    jobs = jobs[~jobs['description'].str.contains(pattern, case=False, na=False, regex=True)]

    after_filtering = len(jobs)

    # Increment the excluded_jobs_count by the number of jobs filtered out
    excluded_jobs_count += (before_filtering - after_filtering)
    time.sleep(1)

def calculate_salary(row):
    if pd.notnull(row['min_amount']) and pd.notnull(row['max_amount']):
        salary = f"{row['currency']} {row['min_amount']}-{row['max_amount']} {row['interval']}"
    elif pd.notnull(row['min_amount']):
        salary = f"{row['currency']} {row['min_amount']} {row['interval']}"
    else:
        salary = ''
    return salary

# Calculate and assign salary to 'employment_pay'
jobs['employment_pay'] = jobs.apply(calculate_salary, axis=1)

current_time = datetime.now().strftime("%b_%d_%Y-%I:%M-%p")

# 1) Add new columns with an empty string
new_columns = ['job_board', 'date_updated', 'company_logo', 'employment_pay', 'employment_skills', 'easy_apply', 'scraped_at']
for column in new_columns:
    if (column == 'job_board'):
        jobs[column] = f"Glassdoor"
    elif (column == 'easy_apply'):
        jobs[column] = f"False"
    elif (column == 'scraped_at'):
        jobs[column] = f" {current_time}"
    else:
        jobs[column] = ''

# 2) Change column names
jobs.rename(columns={
    'description': 'description_list',
    'job_type': 'employment_details',
    'company_url': 'company_link',
    'job_url': 'job_link'
}, inplace=True)

# 3) Remove unwanted columns
columns_to_remove = ['site', 'interval', 'min_amount', 'max_amount', 'currency', 'num_urgent_words', 'emails', 'benefits']
jobs.drop(columns=columns_to_remove, inplace=True)


closeOutScraperHelper(
    start_time,
    "https://glassdoor.com",
    { "q": search_term },
    traversed_pages_count,
    results_wanted,
    excluded_jobs_count,
)

jobs.to_csv(f"jobspy_outputs/glassdoor_jobspy_{current_time}.csv", index=False) # to_xlsx

# Indicate that the main script has finished
timer_running = False

# Wait for the timer thread to finish
timer_thread.join()