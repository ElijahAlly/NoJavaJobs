import scrapy
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import time
from datetime import datetime
from urllib.parse import urljoin
import pytz
from ..pipeline_util import *

class TopTechSpider(scrapy.Spider):
    name = "toptech_spider"
    allowed_domains = ["toptechjobs.com"]

    # Base URL and constant parameters
    base_url = "https://toptechjobs.com/us/en/JobListing.aspx"
    query_params = {
        'shid': '72F2316312B1C09F47CB', # search page uuid
        'sr': 'software+engineer',
        'page': '1',
        'ovrpp': 'js' # jl (classic list) or js (enhanced list view)
    }
    job_fetch = '1'

    def __init__(self):
        self.start_time = datetime.now() # used to calculate total elapsed time when finished
        self.traversed_pages_count = 1
        self.scraped_jobs_count = 0
        self.excluded_jobs_count = 0
        self.driver = webdriver.Safari() # browser
        self.driver.maximize_window() # (width, height) - maximum size

    def start_requests(self):
        # Construct the starting URL
        start_url = self.construct_url(page=1)
        yield scrapy.Request(start_url)

    def construct_url(self, page):
        # Update the page number in the query parameters
        self.query_params['page'] = str(page)

        # Construct and return the full URL
        return f"{self.base_url}?{'&'.join(f'{key}={value}' for key, value in self.query_params.items())}"
    
    # def make_api_request(self, job_ids_str):
    #     api_url = "https://toptechjobs.com/WebServices/JobSearch.asmx/RetrieveJobs?shid=72F2316312B1C09F47CB"
    #     headers = {
    #         "Content-Type": "application/json; charset=UTF-8",
    #         "Accept": "application/json, text/javascript, */*; q=0.01",
    #         "Accept-Encoding": "gzip, deflate, br",
    #         "Accept-Language": "en-US,en;q=0.9",
    #         "Connection": "keep-alive",
    #         "Cookie": "TTFX=FDED459F-1EE8-441A-8815-79CDB29509EB",
    #         "DNT": "1",
    #         "Host": "toptechjobs.com",
    #         "Origin": "https://toptechjobs.com",
    #         "Referer": "https://toptechjobs.com/us/en/JobSearch.aspx?shid=72F2316312B1C09F47CB",
    #         "Sec-Fetch-Dest": "empty",
    #         "Sec-Fetch-Mode": "cors",
    #         "Sec-Fetch-Site": "same-origin",
    #         "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    #         "X-Requested-With": "XMLHttpRequest",
    #         "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\"",
    #         "sec-ch-ua-mobile": "?1",
    #         "sec-ch-ua-platform": "\"Android\""
    #     }
    #     body = json.dumps({
    #         "jobIDsStr": job_ids_str,
    #         "pageNum": self.job_fetch
    #     })
    #     return scrapy.Request(api_url, method="POST", body=body, headers=headers, callback=self.parse_api_response)
    
    # def parse(self, response):
    #     self.driver.get(response.url) # navigate to link
    #     time.sleep(5) # wait for JavaScript to load

    #     # Parse initial set of jobs
    #     return self.parse_jobs(response=response)

    #     # Load more jobs and parse them
    #     # yield self.load_more_jobs_and_parse()
    
    def scroll_within_element(self, driver, element):
        last_height = driver.execute_script("return arguments[0].scrollHeight", element)

        while True:
            # Scroll down to bottom
            driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight;", element)

            # Wait for new jobs to load
            time.sleep(2)

            # Calculate new scroll height and compare with last scroll height
            new_height = driver.execute_script("return arguments[0].scrollHeight", element)
            if new_height == last_height:
                break
            last_height = new_height

        # current_scroll_position, new_height= 0, 1
        # while current_scroll_position <= new_height:
        #     current_scroll_position += speed
        #     driver.execute_script("window.scrollTo(0, {});".format(current_scroll_position))
        #     new_height = driver.execute_script("return document.body.scrollHeight")

    def parse(self, response):
        self.driver.get(response.url) # navigate to link
        time.sleep(5) # wait for JavaScript to load

        try: 
            job_cards = self.driver.find_elements(By.XPATH, '//*[@class="jobItem"]')
            print(f"Job Cards Found: {len(job_cards)}")
        except NoSuchElementException: 
            print("Job cards not found")
            job_cards = []

        if job_cards:
            # Scroll to the last job card
            try:
                # * .jobsearchframe
                # * #jsCustomScrollContainer
                # * #customScrollBox
                # * #contentframe
                # * #jobDetailScroll_outercontainer

                scrollable_div = self.driver.find_element(By.XPATH, '//*[@class="jsCustomScrollContent"]')
                # scrollable_div = self.driver.find_element(By.XPATH, '//*[@class="jsCustomScrollContainer"]')
                # scrollable_div = self.driver.find_element(By.XPATH, '//*[@class="customScrollBox"]')
                # scrollable_div = self.driver.find_element(By.XPATH, '//*[@id="jobreslist_outercontainer"]')
                # scrollable_div = self.driver.find_element(By.XPATH, '//*[@class="summary-content"]')
             
                next_jobs_div = self.driver.find_element(By.XPATH, '//*[@id="nextJobs"]')

                initial_count = len(self.driver.find_elements(By.XPATH, '//*[@class="jobItem"]'))
                while True:
                    self.driver.execute_script("arguments[0].scrollTop = arguments[1].offsetTop;", scrollable_div, next_jobs_div)
                    time.sleep(1)
                    new_count = len(self.driver.find_elements(By.XPATH, '//*[@class="jobItem"]'))
                    if new_count > initial_count:
                        break
                    initial_count = new_count
            except NoSuchElementException:
                print("could not load more jobs")
    
            # self.driver.execute_script("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'end' });", job_cards[-1])
            # time.sleep(1)  # Wait for any lazy-loaded content

            # # Scroll back to the first job card
            # self.driver.execute_script("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'start' });", job_cards[0])
            # time.sleep(1)
        
            for job_card in job_cards:
                time.sleep(0.5) # pause for 1 second before continuing to next job card (recommended for smoother scrolling) # ! Do not exceed 3, unless you want looong pauses
                # Scroll the job card into view using JavaScript
                self.driver.execute_script("arguments[0].scrollIntoView({ behavior: 'smooth' });", job_card)

                # * temporary
                if self.scraped_jobs_count == 60:
                    break

                self.scraped_jobs_count += 1
                item = {
                    'title': "",
                    'company': "",
                    'company_link': "",
                    'location': "",
                    'job_link': "",
                    'employment_pay': "",
                    'description_list': "",
                    'date_posted': "",
                    'scraped_at': "",
                }

                try:
                    item["title"] = job_card.find_element(By.XPATH, './/div/h3').text
                except:
                    print("no job_title found")

                if item["title"] != "":
                    try:
                        id_attr = job_card.get_attribute("id")
                        assembled_link = f"/search-jobs-in/{format_toptech_job_title_for_url(item["title"])}-{id_attr}/?src=51784C66D7"
                        job_link = f"https://toptechjobs.com/us/en{assembled_link}"
                        item["job_link"] = " " + job_link
                    except NoSuchElementException:
                        print("no job_link found")

                try:
                    item["employment_pay"] = " " + job_card.find_element(By.XPATH,'.//p[1]').text
                except NoSuchElementException: 
                    print("no location found")

                try:
                    item["location"] = f" {job_card.find_element(By.XPATH, './/p[2]').text}"
                except NoSuchElementException: 
                    print("no location found")

                try:
                    item["date_posted"] = job_card.find_element(By.XPATH, './/p[4]').text
                except NoSuchElementException: 
                    print("no date_posted found")

                timezone = pytz.timezone("US/Eastern") # get timezone
                item["scraped_at"] = datetime.now(timezone).strftime("%Y-%m-%d %H:%M:%S") # get current time and format

                if item["job_link"] != "":
                    yield scrapy.Request(response.urljoin(item["job_link"]), callback=self.parse_job_details, meta={'item': item})
        else:
            print(f"No Job Cards Found: {job_cards}")

    # def load_more_jobs_and_parse(self):
    #     # Logic to load more jobs, e.g., scroll down or click a button
    #     # self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    #     print("\n\n*************")
    #     print("*************")
    #     print(f"LOADING MORE JOBS::: PAGE::: {self.job_fetch}")
    #     print("*************")
    #     print("*************\n\n")
    #     time.sleep(3)  # Wait for new jobs to load

    #     job_ids = get_toptech_job_ids()
    #     current_page = int(self.job_fetch)
    #     if current_page < len(job_ids):
    #         # Update the page count or job ID as necessary
    #         self.job_fetch = str(current_page + 1)

    #         # fetch new jobs
    #         next_job_id_str = job_ids[current_page - 1]
    #         yield self.make_api_request(job_ids_str=next_job_id_str)

    #         # Parse the new set of jobs
    #         # self.parse_jobs()

    #         # Recursively call to load more jobs
    #         # self.load_more_jobs_and_parse()

    # def parse_api_response(self, response):
    #     # Handle the API response
    #     # This part might involve updating the page with new job data
    #     # Then parse the updated page
    #     self.inject_api_response_into_page(response)
    #     self.parse_jobs()

    # def inject_api_response_into_page(self, response):
    #     # Inject the API response data into the page using Selenium
    #     # This step depends on how the website's front-end can handle dynamic content
    #     print("*************\n\n")
    #     print(f"response::: {response}")
    #     print("*************\n\n") 

    #     # Optionally, if there are more jobs to load:
    #     self.load_more_jobs_and_parse()

    def parse_job_details(self, response):
        self.traversed_pages_count += 1 # each job post is a new page visited
        item = response.meta['item'] # grab item copy

        try:
            company_list = response.xpath('//*[@id="recruitername"]/span/a/span/span/text()').extract()
            if company_list:
                item["company"] = f" {company_list[0]}"
            else:
                list = response.xpath('//*[@id="recruitername"]/span/span/span/text()').extract()
                if list:
                    item["company"] = f" {list[0]}"
            print(f"company: {item["company"]}")
        except NoSuchElementException: 
            print("no company found")
        
        try:
            company_path = response.xpath('//*[@id="recruitername"]/span/a/@href').extract_first() or "/"
            company_link = " " + convert_redirect_link(company_path)
            item["company_link"] = company_link
            print(f"company_link: {company_link}")
        except NoSuchElementException:
            print("no company_link found")
        
        # Grab description
        description_parts = []
        description_selector = response.xpath('//*[@id="JobDetailContainer"]/div[1]/div[1]/div[1]/div[1]/div[1]/div[4]')
        
        for element in description_selector.xpath('./*'):
            if element.root.tag == 'p':
                paragraph_text = ''.join(element.xpath('.//text()').extract()).replace(u'\xa0', u' ').replace(',', '<comma>').strip()
                if paragraph_text:
                    description_parts.append(paragraph_text + "\n\n")
            elif element.root.tag == 'ul':
                list_items = element.xpath('.//li')
                for li in list_items:
                    list_item_text = '- ' + ''.join(li.xpath('.//text()').extract()).replace(u'\xa0', u' ').replace(',', '<comma>').strip()
                    description_parts.append(list_item_text)
                description_parts.append("\n")  # Add a new line after the list

        description = ''.join(description_parts)
        item['description_list'] = '"' + description + '"'

        if (len(item['title']) < 3 or len(item['description_list']) < 10): 
            print("Exluding job post: No title or description present in job")
            self.excluded_jobs_count += 1
            return # Exclude this item
        
        # Check title, description, and skills for 'Java' but not as part of 'JavaScript'
        if (should_filter_out_java(item['title'])) or \
            (should_filter_out_java(item['description_list'])):
            # any(should_filter_out_java(skill) for skill in item['employment_skills']): # ! no dedicated skills list on job page
            print(f"Excluding job post: {item['job_link']} as it mentions Java in the title, skills, or description.")
            self.excluded_jobs_count += 1
            return # Exclude this item

        yield item

    def closed(self, reason):
        print("############")
        closeOutScraperHelper(
            self.start_time,
            self.base_url,
            self.query_params,
            self.traversed_pages_count,
            self.scraped_jobs_count,
            self.excluded_jobs_count,
        )
        print("############")
        
        # Quit the Selenium driver
        if self.driver:
            self.driver.quit()
