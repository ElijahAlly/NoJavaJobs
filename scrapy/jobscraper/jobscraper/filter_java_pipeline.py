from scrapy.exceptions import DropItem

class FilterJavaPipeline(object):
    def process_item(self, item, spider):
        # Assuming 'title' or 'description' fields contain the job listing text
        if 'title' in item and 'java' in item['title'].lower():
            raise DropItem(f"Filtered out job listing as it contains 'Java': {item['title']}")
        if 'description' in item and 'java' in item['description'].lower():
            raise DropItem(f"Filtered out job listing as it contains 'Java': {item['description']}")

        # Return the item if it does not contain 'Java'
        return item
