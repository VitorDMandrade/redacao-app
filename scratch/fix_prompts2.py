import sys

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Grammar Challenge Generation
old_gen = "navigator.clipboard.writeText(PROMPT_GERAR_DESAFIO).then(() => {"
new_gen = """const fullPromptGen = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\n${PROMPT_GERAR_DESAFIO}`;
            navigator.clipboard.writeText(fullPromptGen).then(() => {"""
content = content.replace(old_gen, new_gen)

# Fix Grammar Challenge Evaluation
old_eval = """let prompt = PROMPT_CORRIGIR_DESAFIO.replace("{TEXTO_ORIGINAL}", currentGrammarChallenge).replace("{REESCRITA_ALUNO}", studentRewrite);

            navigator.clipboard.writeText(prompt).then(() => {"""
new_eval = """let prompt = PROMPT_CORRIGIR_DESAFIO.replace("{TEXTO_ORIGINAL}", currentGrammarChallenge).replace("{REESCRITA_ALUNO}", studentRewrite);
            const fullPromptEval = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\n${prompt}`;
            navigator.clipboard.writeText(fullPromptEval).then(() => {"""
content = content.replace(old_eval, new_eval)

# Fix Grammar Tutor
old_tutor = "const fullPrompt = `INSTRUÇÃO CRÍTICA FINAL:"
new_tutor = "const fullPrompt = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\nINSTRUÇÃO CRÍTICA FINAL:"
content = content.replace(old_tutor, new_tutor)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
