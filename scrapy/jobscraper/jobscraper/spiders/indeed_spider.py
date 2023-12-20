import scrapy
from selenium import webdriver
import time

class IndeedSpider(scrapy.Spider):
    name = "indeed_spider"
    allowed_domains = ["indeed.com"]
    start_urls = ["https://www.indeed.com/jobs?q=software+engineer&l="]

    def __init__(self):
        self.driver = webdriver.Safari()

    def parse(self, response):
        self.driver.get(response.url)
        time.sleep(2)  # Let JavaScript Content Load

        job_cards = self.driver.find_elements_by_xpath('//div[contains(@class, "jobsearch-SerpJobCard")]')
        for job_card in job_cards:
            title = job_card.find_element_by_xpath('.//h2').text
            link = job_card.find_element_by_xpath('.//h2/a').get_attribute('href')
            company = job_card.find_element_by_xpath('.//span[@class="company"]').text
            location = job_card.find_element_by_xpath('.//div[contains(@class, "location")]').text

            # Extracting salary if present
            try:
                salary = job_card.find_element_by_xpath('.//span[@class="salaryText"]').text
            except:
                salary = "N/A"

            # Check for 'Java' and continue if present
            if 'java' in title.lower() or 'java' in job_card.text.lower():
                continue

            yield {
                'title': title,
                'link': link,
                'company': company,
                'location': location,
                'salary': salary
            }

    def close(self, reason):
        self.driver.quit()
