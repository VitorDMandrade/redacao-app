import sys

content = open('script.js', 'r', encoding='utf-8').read()

parts = content.split("document.addEventListener('DOMContentLoaded', () => {")

if len(parts) >= 3:
    second_body = parts[2]
    split_target = "    const favBtn = document.getElementById('fc-favorite-btn');"
    if split_target in second_body:
        cleaned_second_body = "\n" + split_target + second_body.split(split_target)[1]
        parts[2] = cleaned_second_body
    
    new_content = "document.addEventListener('DOMContentLoaded', () => {".join(parts)
    open('script.js', 'w', encoding='utf-8').write(new_content)
    print('Cleaned up script.js!')
else:
    print('Could not find two DOMContentLoaded blocks.')
