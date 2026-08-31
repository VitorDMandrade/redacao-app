import os

file_path = "script.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "âÂ Å’": "❌",
    "âÅ“â€¦": "✅",
    "CRÃƒÂ TICA": "CRÍTICA",
    "CronÃƒÂ´metro": "Cronômetro",
    "AVALIAÃƒâ€¡ÃƒÆ’O": "AVALIAÇÃO",
    "LÃƒâ€œGICA": "LÓGICA",
    "LÃ³gica": "Lógica",
    "diagnÃ³stico": "diagnóstico",
    "temÃ¡tico": "temático"
}

for bad, good in replacements.items():
    content = content.replace(bad, good)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed encodings in script.js!")
