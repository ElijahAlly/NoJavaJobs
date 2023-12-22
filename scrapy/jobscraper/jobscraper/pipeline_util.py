import re
from datetime import datetime

def should_filter_out_java(text):
    # Convert text to lowercase for case-insensitive matching
    text_lower = text.lower()

    # Using regular expressions to find standalone 'Java'
    java_pattern = r'\bjava\b'
    java_match = re.search(java_pattern, text_lower)

    # Filter out if 'Java' is found, regardless of 'JavaScript'
    if java_match is not None:
        return True

    # Do not filter out if no 'Java' is found
    return False

def formatDayRange(string):
    if string is None or string == 'NONE':
        return 'Any Day'
    elif string == 'ONE':
        return 'Today'
    elif string == 'THREE':
        return 'Last 3 Days'
    elif string == 'SEVEN':
        return 'Last 7 Days'
    return string

def formatQuery(string):
    if string is None:
        return ''
    
    return string.replace("%20", " ")

def closeOutScraperHelper(start_time, base_url, query_params, traversed_pages_count, scraped_jobs_count, excluded_jobs_count):
    # calculate elapsed time
        end_time = datetime.now()
        elapsed_time = end_time - start_time
        # Format the elapsed time
        elapsed_time_formatted = str(elapsed_time).split('.')[0]  # Removing microseconds

        # ANSI escape codes for different colors
        RED = '\033[91m'
        GREEN = '\033[92m'
        YELLOW = '\033[93m'
        BLUE = '\033[34m'
        MAGENTA = '\033[95m'
        CYAN = '\033[96m'
        WHITE = '\033[97m'
        GRAY = '\033[90m'
        RESET = '\033[0m' # Reset to default color

        print(f"\n\n")
        print(f"   {WHITE}***********************************{RESET}")
        print(f"   {GREEN}             SUCCESS\n")
        print(f"   {GREEN}   Scraped: {base_url}")
        if query_params and query_params['q']:
            print(f"   {GREEN}   Query: {formatQuery(query_params['q'])}")
            print(f"   {GREEN}   Page Size: {query_params['pageSize'] or "Infinite Scroll"}")
            print(f"   {GREEN}   Day Range: {formatDayRange(query_params['filters.postedDate'])}")
        print(f"   {WHITE}***********************************{RESET}\n")

        print(f"   {BLUE}***********************************{RESET}")
        print(f"   {MAGENTA}   Total elapsed time: {elapsed_time_formatted}{RESET}")
        print(f"   {BLUE}***********************************{RESET}\n")

        print(f"   {BLUE}***********************************{RESET}")
        print(f"   {CYAN}   Total pages visited: {traversed_pages_count}{RESET}")
        print(f"   {BLUE}***********************************{RESET}\n")

        print(f"   {BLUE}***********************************{RESET}")
        print(f"   {YELLOW}   Total jobs scraped: {scraped_jobs_count}{RESET}")
        print(f"   {BLUE}***********************************{RESET}\n")

        print(f"   {BLUE}***********************************{RESET}")
        print(f"   {RED}   Total jobs excluded: {excluded_jobs_count}{RESET}")
        print(f"   {BLUE}***********************************{RESET}\n")

        print(f"   {BLUE}***********************************{RESET}")
        print(f"   {GREEN}   Total jobs in output csv: {scraped_jobs_count - excluded_jobs_count}{RESET}")
        print(f"   {BLUE}***********************************{RESET}\n")

        print(f"   {RED}+++++++++++++++++++++++++++++++++++")
        print(f"   {RED}Thanks for scraping carefully!{RESET}\n")
        print(f"   {RED}Visit us: https://www.NoJavaJobs.io{RESET}\n")
        print(f"   {GRAY}Created by: Elijah M. Ally{RESET}")
        print(f"   {GRAY}GitHub: https://github.com/ElijahAlly/NoJavaJobs{RESET}\n")