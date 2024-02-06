import re

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
