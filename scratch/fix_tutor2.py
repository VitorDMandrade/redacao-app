import sys
import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r"(const fullPrompt = `)(.*?Aja como o Prof\. Daniel Lino)"
replacement = r"const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\n\2"
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
