import sys

with open('script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'O aluno perguntou: "${question}"' in line:
        for j in range(i, i+5):
            if 'navigator.clipboard.writeText(fullPrompt).then(() => {' in lines[j]:
                lines[j] = lines[j].replace(
                    "navigator.clipboard.writeText(fullPrompt).then(() => {",
                    "const tutorPromptFinal = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\n${fullPrompt}`;\n            navigator.clipboard.writeText(tutorPromptFinal).then(() => {"
                )
                break
        break

with open('script.js', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("done")
