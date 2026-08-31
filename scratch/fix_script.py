import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: introKeywords
old_intro = """            repsToRender.forEach(rep => {
                const introKeywords = ['INTRODUÇÃO', 'CINEMA', 'SÉRIE', 'ANIMAÇÃO', 'DOCUMENTÁRIO', 'FILME', 'MÚSICA', 'FICÇÃO', 'ROMANCE'];
                const isIntro = (rep.obra && introKeywords.some(k => rep.obra.toUpperCase().includes(k))) || (rep.uso && rep.uso.includes('Introdução'));
                if (favs.includes(rep.obra)) {
                    favReps.push(rep);
                } else if (isIntro) {
                    introReps.push(rep);
                } else {
                    otherReps.push(rep);
                }
            });"""

new_intro = """            repsToRender.forEach(rep => {
                if (favs.includes(rep.obra)) {
                    favReps.push(rep);
                } else if (rep.tipo === 'intro') {
                    introReps.push(rep);
                } else if (rep.tipo === 'dev') {
                    otherReps.push(rep);
                } else {
                    otherReps.push(rep);
                }
            });"""
content = content.replace(old_intro, new_intro)

# Fix 2: Conceito background
old_concept = """        if (ex.concept && ex.conceptExplanation) {
            feedbackHTML += `<div style="margin-top: 10px; padding: 10px; background: rgba(0,0,0,0.1); border-radius: 4px;">`;
            feedbackHTML += `<strong>📚 Conceito: ${ex.concept}</strong><br>`;"""

new_concept = """        if (ex.concept && ex.conceptExplanation) {
            feedbackHTML += `<div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 4px; border-left: 2px solid var(--primary);">`;
            feedbackHTML += `<strong>📚 Conceito: ${ex.concept}</strong><br>`;"""
content = content.replace(old_concept, new_concept)

# Fix 3: PROMPT_MEU_MODELO clipboard
old_modelo = """            const promptFinal = PROMPT_MEU_MODELO
                .replace("{TEMA}", tema)
                .replace("{BANCA}", currentBanca.nome);"""
new_modelo = """            const promptFinal = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\n${PROMPT_MEU_MODELO}`
                .replace("{TEMA}", tema)
                .replace("{BANCA}", currentBanca.nome);"""
content = content.replace(old_modelo, new_modelo)

# Fix 4: PROMPT_GERAR_DESAFIO clipboard
old_gerar = """                navigator.clipboard.writeText(PROMPT_GERAR_DESAFIO).then(() => {"""
new_gerar = """                const fullPromptGen = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\n${PROMPT_GERAR_DESAFIO}`;
                navigator.clipboard.writeText(fullPromptGen).then(() => {"""
content = content.replace(old_gerar, new_gerar)

# Fix 5: PROMPT_CORRIGIR_DESAFIO clipboard
old_eval = """                navigator.clipboard.writeText(prompt).then(() => {"""
new_eval = """                const fullPromptEval = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\n${prompt}`;
                navigator.clipboard.writeText(fullPromptEval).then(() => {"""

# Be careful, replace only the specific one for evaluation
# We can find it by looking for the surrounding context
old_eval_full = """                prompt = prompt.replace("{TEXTO_ORIGINAL}", originalText);
                prompt = prompt.replace("{REESCRITA_ALUNO}", userRewrite);

                navigator.clipboard.writeText(prompt).then(() => {"""
new_eval_full = """                prompt = prompt.replace("{TEXTO_ORIGINAL}", originalText);
                prompt = prompt.replace("{REESCRITA_ALUNO}", userRewrite);

                const fullPromptEval = `${typeof SYSTEM_PROMPT !== 'undefined' ? SYSTEM_PROMPT : ''}\\n\\n${prompt}`;
                navigator.clipboard.writeText(fullPromptEval).then(() => {"""
content = content.replace(old_eval_full, new_eval_full)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
