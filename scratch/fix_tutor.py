import sys

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Grammar Tutor
old_tutor = 'const fullPrompt = `INSTRUÇÃO CRÍTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\\n\\n---\\n\\nAja como o Prof. Daniel Lino.'
new_tutor = 'const fullPrompt = `${typeof SYSTEM_PROMPT !== \\'undefined\\' ? SYSTEM_PROMPT : \\'\\'}\\n\\nINSTRUÇÃO CRÍTICA FINAL: Responda APENAS E EXCLUSIVAMENTE com um bloco de código contendo o objeto JSON solicitado, sem markdown em volta do json ou explicações adicionais antes ou depois.\\n\\n---\\n\\nAja como o Prof. Daniel Lino.'
content = content.replace(old_tutor, new_tutor)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
