import scrapy
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
from datetime import datetime
import pytz

class DiceSpider(scrapy.Spider):
    name = "dice_spider"
    allowed_domains = ["dice.com"]
    # the current page number is 1
    # size of page is 20
    start_urls = [f"https://www.dice.com/jobs?q=software%20engineer&countryCode=US&radius=30&radiusUnit=mi&page=1&pageSize=100&language=en"] 

    def __init__(self):
        self.driver = webdriver.Safari()
        self.driver.set_window_size(900, 600)

    def parse(self, response):
        self.driver.get(response.url) # navigate to link
        time.sleep(5) # wait for JavaScript to load

        # get all cards from search result link
        job_cards = self.driver.find_elements(By.XPATH, '//*[@data-cy="search-card"]')

        for job_card in job_cards:
            item = {
                'title': "",
                'company': "",
                'company_link': "",
                'company_logo': "",
                'location': "",
                'job_link': "",
                'employment_details': "",
                'employment_pay': "",
                'description_list': "",
                'employment_skills': "",
                'date_posted': "",
                'date_updated': "Updated Never",
                'scraped_at': "", 
            }

            try:
                job_id = job_card.find_element(By.XPATH, './/div/div[1]/div/div[2]/div[1]/h5/a').get_attribute("id")
                job_link = f"https://www.dice.com/job-detail/{job_id}"
                # job_links.append(job_link)
                item["job_link"] = job_link
            except NoSuchElementException: 
                print("no job_link found") 

            try:
                item["company"] = job_card.find_element(By.XPATH, './/div/div[1]/div/div[2]/div[1]/div/a').text
            except NoSuchElementException: 
                print("no company found")

            try:
                item["company_link"] = job_card.find_element(By.XPATH, './/div/div[1]/div/div[2]/div[1]/div/a').get_attribute("href")
            except NoSuchElementException: 
                print("no company_link found")

            try:
                item["company_logo"] = job_card.find_element(By.XPATH, './/div/div[1]/dhi-company-logo/div/p/a/img').get_attribute("src")
            except NoSuchElementException: 
                print("no company_logo found")

            try:
                item["location"] = job_card.find_element(By.XPATH, './/div/div[1]/div/div[2]/div[1]/div/span').text
            except NoSuchElementException: 
                print("no location found")

            try:
                item["title"] = job_card.find_element(By.XPATH, './/div/div[1]/div/div[2]/div[1]/h5/a').text
            except NoSuchElementException: 
                print("no title found")

            try:
                item["date_posted"] = job_card.find_element(By.XPATH, './/div/div[2]/div[1]/div[2]/span[1]').text
            except NoSuchElementException: 
                print("no date_posted found")

            try:
                item["date_updated"] = job_card.find_element(By.XPATH, './/div/div[2]/div[1]/div[2]/span[2]').text
            except NoSuchElementException: 
                print("never updated")
            
            timezone = pytz.timezone("US/Eastern") # get timezone
            item["scraped_at"] = datetime.now(timezone).strftime("%Y-%m-%d %H:%M:%S") # get current time and format

            yield scrapy.Request(response.urljoin(item["job_link"]), callback=self.parse_job_details, meta={'item': item})

        current_page = response.meta.get('page', 1)
        if current_page < 3:  # Limit to first 3 pages
            next_page = current_page + 1
            next_page_url = f"https://www.dice.com/jobs?q=software%20engineer&countryCode=US&radius=30&radiusUnit=mi&page={next_page}&pageSize=100&language=en"
            yield scrapy.Request(next_page_url, callback=self.parse, meta={'page': next_page})

    def parse_job_details(self, response):
        item = response.meta['item']

        # Grab job details from listing page
        item["employment_details"] = response.xpath('//*[@data-cy="employmentDetails"]/div/div/span/text()').get()
        item["employment_pay"] = response.xpath('//*[@data-cy="payDetails"]/div/div/span/text()').get()
        
        # Grab description
        description_parts = []
        description_selector = response.xpath('//*[@data-cy="jobDescription"]/div')

        for element in description_selector.xpath('./*'):
            if element.root.tag == 'p':
                paragraph_text = ''.join(element.xpath('.//text()').extract()).replace(u'\xa0', u' ').strip()
                if paragraph_text:
                    description_parts.append(paragraph_text + "\n\n")
            elif element.root.tag == 'ul':
                list_items = element.xpath('.//li')
                for li in list_items:
                    list_item_text = '- ' + ''.join(li.xpath('.//text()').extract()).replace(u'\xa0', u' ').strip()
                    description_parts.append(list_item_text)
                description_parts.append("\n")  # Add a new line after the list

        item['description_list'] = ''.join(description_parts)

        # Get every skill
        skills = response.xpath('//*[@data-cy="skillsList"]//div/span/text()').extract()
        item["employment_skills"] = skills

        # Check for 'Java' but not 'JavaScript' in title, description, and skills
        java_keyword = 'java'
        if (java_keyword in item['title'].lower() and 'javascript' not in item['title'].lower()) or \
        (java_keyword in item['description_list'].lower() and 'javascript' not in item['description_list'].lower()) or \
        any(java_keyword in skill.lower() and 'javascript' not in skill.lower() for skill in skills):
            print(f"Excluding job post: {item['title']} as it mentions Java")
            return  # Exclude this item

        yield item

    def close(self, reason):
        self.driver.quit()