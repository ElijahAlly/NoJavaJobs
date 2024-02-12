# import scrapy
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.common.exceptions import NoSuchElementException
# import time
# from datetime import datetime
# import pytz
# from ..pipeline_util import should_filter_out_java, closeOutScraperHelper

# class AngelListSpider(scrapy.Spider):
#     name = "angellist_spider"
#     allowed_domains = ["wellfound.com"]
#     # Base URL and constant parameters
#     base_url = "https://wellfound.com/jobs"
#     # query_params = {
#     #     'q': 'software%20engineer', # search query (change for different results)
#     # }

#     def __init__(self):
#         self.start_time = datetime.now() # used to calculate total elapsed time when finished
#         self.traversed_pages_count = 0
#         self.scraped_jobs_count = 0
#         self.excluded_jobs_count = 0
#         self.driver = webdriver.Safari() # browser
#         self.driver.set_window_size(1500, 750) # (width, height)

#     def start_requests(self):
#         # Construct the starting URL
#         yield scrapy.Request(self.base_url)

#     def parse(self, response):
#         self.driver.get(response.url) # navigate to link
#         time.sleep(5) # wait for JavaScript to load

#         # get all cards from search result link
#         job_cards = WebDriverWait(self.driver, 6).until(
#             EC.presence_of_all_elements_located((By.XPATH, '//*[@data-test="StartupResult"]'))
#         )
#         # self.driver.find_elements(By.XPATH, '//*[@data-cy="search-card"]')

#         for job_card in job_cards:
#             # time.sleep(1) # pause for 1 second before continuing to next job card (recommended for smoother scrolling) # ! Do not exceed 3, unless you want looong pauses
#             # Scroll the job card into view using JavaScript
#             self.driver.execute_script("arguments[0].scrollIntoView(true);", job_card)

#             self.scraped_jobs_count += 1
#             item = {
#                 'title': "",
#                 'company': "",
#                 'company_link': "",
#                 'company_logo': "",
#                 'locations': "",
#                 'job_link': "",
#                 'employment_details': "",
#                 'employment_pay': "",
#                 'description_list': "",
#                 'employment_skills': "",
#                 'company_attributes': "",
#                 'date_posted': "",
#                 'scraped_at': "", 
#             }

#             try:
#                 job_links = job_card.find_element(By.XPATH, ".//div[2]/div[1]")
#                 job_link_count = 1
#                 for job_link in job_links:
#                     item["job_link"] += f", {self.base_url}{job_link.find_element(By.XPATH, f".//div[{job_link_count}]/a").get_attribute("href")}"
#                     job_link_count += 1
#             except NoSuchElementException: 
#                 print("no job_link found") 

#             try:
#                 item["company"] = job_card.find_element(By.XPATH, './/div[1]/a[1]/div[2]/div[1]/div[1]/h2').text
#             except NoSuchElementException: 
#                 print("no company found")

#             try:
#                 item["company_link"] = f"{self.base_url}{job_card.find_element(By.XPATH, './/div[1]/a[1]').get_attribute("href")}"
#             except NoSuchElementException: 
#                 print("no company_link found")

#             try:
#                 item["company_logo"] = job_card.find_element(By.XPATH, './/div[1]/a[1]/div[1]/img').get_attribute("src")
#             except NoSuchElementException: 
#                 print("no company_logo found")

#             try:
#                 locations = job_card.find_element(By.XPATH, ".//div[2]/div[1]/div[1]/a[1]/div[1]/span[1]/span[1]")
#                 locations_count = 1
#                 for location in locations:
#                     item["locations"] += f", {location.find_element(By.XPATH, f".//span[{locations_count}]").text}"
#                     locations_count += 1
#             except NoSuchElementException: 
#                 print("no location found")

#             try:
#                 item["title"] = job_card.find_element(By.XPATH, ".//div[2]/div[1]/div[1]/a[1]/div[1]/div[1]/span[1]").text
#             except NoSuchElementException: 
#                 print("no title found")

#             try:
#                 company_attributes = job_card.find_element(By.XPATH, './/ul')
#                 attr_count = 1
#                 for attribute in company_attributes:
#                     item["company_attributes"] += f", {attribute.find_element(By.XPATH, f".//li[{attr_count}]").text}"
#                     attr_count += 1
#             except NoSuchElementException:
#                 print("no easy_apply found")

#             try:
#                 jobs = job_card.find_element(By.XPATH, './/div[2]/div[1]')
#                 jobs_count = 1
#                 for job in jobs:
#                     item["date_posted"] = job.find_element(By.XPATH, f".//div[{jobs_count}]/a[1]/div[2]/span[2]").text
#                     jobs_count += 1
#             except NoSuchElementException:
#                 print("no date_posted found")

#             timezone = pytz.timezone("US/Eastern") # get timezone
#             item["scraped_at"] = datetime.now(timezone).strftime("%Y-%m-%d %H:%M:%S") # get current time and format

#             yield scrapy.Request(response.urljoin(item["job_link"]), callback=self.parse_job_details, meta={'item': item})

#         # # Pagination logic
#         # current_page = response.meta.get('page', 1) # grab current page number (or set to 1 if <empty/null/None/undefined/etc>)
#         # if current_page < 10:  # * Limit to first {10} pages, currently {100} results per page
#         #     self.traversed_pages_count += 1
#         #     next_page = current_page + 1
#         #     next_page_url = self.construct_url(page=next_page)
#         #     yield scrapy.Request(next_page_url, callback=self.parse, meta={'page': next_page})

#     def parse_job_details(self, response):
#         self.traversed_pages_count += 1 # each job post is a new page visited
#         item = response.meta['item'] # grab item copy

#         # Grab job details from listing page
#         item["employment_details"] = response.xpath('//*[@data-cy="employmentDetails"]/div/div/span/text()').get()
#         item["employment_pay"] = response.xpath('//*[@data-cy="payDetails"]/div/div/span/text()').get()
        
#         # Grab description
#         description_parts = []
#         description_selector = response.xpath('//*[@data-cy="jobDescription"]/div')

#         for element in description_selector.xpath('./*'):
#             if element.root.tag == 'p':
#                 paragraph_text = ''.join(element.xpath('.//text()').extract()).replace(u'\xa0', u' ').strip()
#                 if paragraph_text:
#                     description_parts.append(paragraph_text + "\n\n")
#             elif element.root.tag == 'ul':
#                 list_items = element.xpath('.//li')
#                 for li in list_items:
#                     list_item_text = '- ' + ''.join(li.xpath('.//text()').extract()).replace(u'\xa0', u' ').strip()
#                     description_parts.append(list_item_text)
#                 description_parts.append("\n")  # Add a new line after the list

#         item['description_list'] = ''.join(description_parts)

#         # Get every skill
#         skills = response.xpath('//*[@data-cy="skillsList"]//div/span/text()').extract()
#         item["employment_skills"] = skills

#         if (len(item['title']) < 3 or len(item['description_list']) < 10): 
#             print("Exluding job post: No title or description present in job")
#             self.excluded_jobs_count += 1
#             return # Exclude this item
        
#         # Check title, description, and skills for 'Java' but not as part of 'JavaScript'
#         if (should_filter_out_java(item['title'])) or \
#             (should_filter_out_java(item['description_list'])) or \
#             any(should_filter_out_java(skill) for skill in item['employment_skills']):
#             print(f"Excluding job post: {item['job_link']} as it mentions Java in the title, skills, or description.")
#             self.excluded_jobs_count += 1
#             return # Exclude this item

#         yield item

#     def closed(self, reason):
#         closeOutScraperHelper(
#             self.start_time,
#             self.base_url,
#             {},
#             self.traversed_pages_count,
#             self.scraped_jobs_count,
#             self.excluded_jobs_count,
#         )

#         # Quit the Selenium driver
#         if self.driver:
#             self.driver.quit()