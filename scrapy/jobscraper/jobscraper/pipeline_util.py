import re
from datetime import datetime
from urllib.parse import unquote

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

def convert_redirect_link(redirect_link):
    if redirect_link == "/": return "/"
    # Using regular expressions to extract the necessary parts
    match = re.search(r'Redirect/DirectoryUrl\.ttrs\?id=\w+&L=(.*)', redirect_link)
    if match:
        # Extract the part after 'L=' and unquote it
        path = match.group(1)
        decoded_path = unquote(path)
        direct_link = "https://toptechjobs.com" + decoded_path
        return direct_link
    else:
        return "/"

def format_toptech_job_title_for_url(title):
    # Define a set of special characters to be replaced with dashes
    special_chars = set("()!_$#")

    # Replace each special character with a dash
    for char in special_chars:
        title = title.replace(char, "-")
    
    # Replace spaces with dashes and convert to uppercase
    formatted_title = title.replace(" ", "-").upper()

    # Recursively remove double dashes
    while "--" in formatted_title:
        formatted_title = formatted_title.replace("--", "-")

    return formatted_title

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
        return 'None'
    
    string.replace("%20", " ")
    string.replace("+", " ")
    return string.lower()

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
    print(f"   {GREEN}             SUCCESS\n{RESET}")
    print(f"   {GREEN}   Scraped: {base_url}{RESET}")

    if query_params != None:
        if query_params.get('q') != None:
            print(f"   {GREEN}   Query: {formatQuery(query_params['q'])}{RESET}")
        elif query_params.get('sr') != None:
            print(f"   {GREEN}   Query: {formatQuery(query_params['sr'])}{RESET}")
        
        if query_params.get('pageSize') != None:
            print(f"   {GREEN}   Page Size: {scraped_jobs_count / int(query_params['pageSize'])}{RESET}")
        else:
            print(f"   {GREEN}   Page Size: Infinite Scroll{RESET}")

        if query_params.get('filters.postedDate') != None:
            print(f"   {GREEN}   Day Range: {formatDayRange(query_params['filters.postedDate'])}{RESET}")

        if query_params.get('shid') != None:
            print(f"   {GREEN}   Search ID: {formatQuery(query_params['shid'])}{RESET}")

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

def get_toptech_job_ids():
    return [
        "88351200E2401CDA29#A5D9BCB50F9E32C30E#8BF1FC2FD95AD2799C#102FA14116205B27B3#16A5FE868C94F8A4BB#7C5775B90A08CF7FAF#DE956676A424C05473#30C596ECD2B0C01679#8EEEE9188085FBFACD#0932A6062B09E8548A#FCB132006E14145AC5#848B6DADD22407AB07#52754C18D8F0F2329B#D6D369A7F8F833F9E9#43C13E6D71BE18DBC8#D64B2543E8F0BF2599#290FCBA047FAA9EA68#A1FB494E3772CB349C#92FF9C3E28B10A7F2E#4EF44C2F4C61AAC93C#AA8B6076D8069D074D#6BCA46D829CD89939B#F4F73DC9A208616170#42CA5B72248D51DA86#23121DB73586263519",
        "4AE019D64438D3113D#B9C8C9FB0F7A6B50D4#E7743D01A9E9A73F93#283B6AE222D6ACB0F8#01F3BDE2BF4A7758DD#07E89303B1E93C4E52#0DD693972363B00E8C#CE37534960709C4F8B#37C5AAA9F55A1CA44E#4644CC0744D1EA0B39#CC249C71C6755AC5FF#8BB74BF6A5E5B98498#7C06511E8279F1CEFC#F7077D8CB11253C7D0#FD702B65E3AD6EF3C9#1C56D279EE5BE33F20#DB887B5F35095ED933#FCE628036E9F17B2EC#6BB67EB47900A18AD1#CBAC9E6A8922095492#1B80F0C8B14B3E58F4#AFA9F5F6C944FC8FEC#AD469C248759691F25#2DA9B64F376A30195B#D4FE156A0A203EBDFA",
        "7F32FAB01D15678B57#6CB0AD1852A7E4132C#86232A30348A9FB169#D42B86FA6EC69219F5#0740BA4E25CF117C1E#2D54AABCFF1EFDDBFF#15F06CF61F3781E9EF#1A724D64D4E9FC92DD#E1511ABF4B420C49B7#5B4EAC76215DD9856F#BCA918B2567876B866#73230FE645E1BD20EA#A84986202ACC747921#2B082733BD49EEE184#3463EDA522EC06CC12#8DDDBD3C8B1C47DF02#C1944395E7F9EA4AAB#5B174EB71999993D95#E6827B960035694CB8#43D06925DD7DA32B37#26345BAC60EB819660#C93435F357D5377BFF#404BD2D28AC67400D0#1A120AFF18FB5FB8BC#1B06184AD1C545D021",
        "0BD2622449153FCFA3#0BCDD1A27D107031CD#B3B3C4111170F986DB#79D3FC17933C79381D#F4CA5E095E87955BA0#738921961564304F08#5DAFAA71D755D53B7F#14308AE3260511FA75#8176E7479F2348D600#9170CA547353B179A6#6CF07ABB4E753152ED#BE8651A8F064928E4B#C798C3C3B1798EED4F#A4F00F2252602D8DC6#164BE6047CB920F319#9B014CFF09E95A9CED#C336A6F43142888B25#519D63BE1FF351B1E2#E13FE8CF4BDB8EF488#D2B3A5179CF857D94E#801B3414FA32B12788#B0D116D0522423415C#29D15CD91316923868#0D9BDCB397A450C750#DF70F4006532338699",
        "59AFC77CBFAA1D25B2#8024E8C13A15B09BC6#B1585630935B7666ED#3200CE0538C1A6DF8C#85203A6877C35A8E39#B738022E05170AF0EF#68A6CFAC2EB5234A7C#810A5D411F43C9CB0F#5A36A3F62CE147689A#9714D8A80DBF70262B#7BAEBFA14D47B3FBA5#253CE0DE4FEB7018DD#98D6B3801EA5EF5E7C#B6707ED9B4A11E8350#4CDE2F889A2D730608#50403A3F4A157A5D02#9F9E0F9D51F79BC719#BED2454000B9F1C6CA#124C708F6099F81D40#181DF94FEE2ADD0544#475CE125F111B000CD#B2791BCF7C46E50847#DFBDADC229801D4FD2#BBFA6A4449BD86C9E8#5709E98299FDB2DCBB",
        "AC33B4280E6A806D95#0BFE402A41348F019D#D7D23E9CE545A24114#425ACE7B5843529A57#5CA8F5D8520F1DC51F#00F52ED4A2F01A1995#8D9BBD7E6B327BAF60#AF8C3B1FC91D138E92#8BF6B8CAE195A47F44#58E2DE154A1F62B461#C958A93B5F09D1BA34#A6AE64C194C318A02F#8331FF78D5A0D7DD92#7A313367344E73C6A5#0B26DC8EB135D063EC#B5062CDCCF18738F22#A1BDC1C4971C59F1A0#097EB0DCE3018489AA#1719B3C0B1C8AB55E6#7EBFEE48546602ADD7#E973F03BA34C1C7AA6#394D16EFE36EEA3E5A#67AB5445953848B4C4#1241DFF3BCDEDF9A85#F82A0AE9B217DED811",
    ] # jobs from query: software engineer