import re

html_content = open('index.html', 'r', encoding='utf-8').read()
js_content = open('script.js', 'r', encoding='utf-8').read()

html_ids = set(re.findall(r'id=\"([^\"]+)\"', html_content))
html_ids.update(re.findall(r'id=\'([^\']+)\'', html_content))

js_ids = set(re.findall(r'getElementById\([\'\"]([^\'\"]+)[\'\"]\)', js_content))

missing = js_ids - html_ids
if missing:
    print('Missing IDs in HTML:', missing)
else:
    print('All IDs found!')
