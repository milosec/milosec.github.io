import re

with open('assets/theme/js/script.js', 'r') as f:
    content = f.read()
    print("Found scroll event listeners:", len(re.findall(r'addEventListener\(["\']scroll["\']', content)))
