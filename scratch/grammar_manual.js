
// ==========================================
// DESAFIO GRAMATICAL (COPIAR/COLAR MANUAL)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnCopyGen = document.getElementById('btn-copy-grammar-challenge');
    const inputGen = document.getElementById('grammar-challenge-input');
    
    const areaChallenge = document.getElementById('grammar-challenge-area');
    const textDisplay = document.getElementById('grammar-challenge-text');
    const hintDisplay = document.getElementById('grammar-challenge-hint');
    const rewriteInput = document.getElementById('grammar-challenge-rewrite');
    
    const areaEvaluate = document.getElementById('grammar-evaluate-area');
    const btnCopyEval = document.getElementById('btn-evaluate-grammar-challenge');
    const inputEval = document.getElementById('grammar-evaluate-input');
    
    const responseArea = document.getElementById('grammar-challenge-response');

    function parseGeminiJSON(text) {
        try {
            return JSON.parse(text);
        } catch(e) {
            const cleaned = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
            return JSON.parse(cleaned);
        }
    }

    // 1. Gerar Desafio
    if (btnCopyGen) {
        btnCopyGen.addEventListener('click', () => {
            if (typeof PROMPT_GERAR_DESAFIO !== 'undefined') {
                navigator.clipboard.writeText(PROMPT_GERAR_DESAFIO).then(() => {
                    alert("Prompt copiado! Cole no Gemini e traga o JSON gerado.");
                    btnCopyGen.innerText = "Prompt Copiado ✔️";
                    setTimeout(() => { btnCopyGen.innerText = "Copiar Prompt: Gerar Desafio"; }, 2000);
                }).catch(err => {
                    alert("Erro ao copiar: " + err);
                });
            }
        });
    }

    if (inputGen) {
        inputGen.addEventListener('input', () => {
            const val = inputGen.value.trim();
            if (!val) return;

            try {
                const data = parseGeminiJSON(val);
                if (data.texto_problematico) {
                    textDisplay.innerText = data.texto_problematico;
                    hintDisplay.innerText = "Dica: " + (data.dica || "");
                    rewriteInput.value = "";
                    areaChallenge.classList.remove('hidden');
                    areaEvaluate.classList.remove('hidden');
                }
            } catch(e) {
                // Ignore errors while typing
            }
        });
    }

    // 3. Avaliar Desafio
    if (btnCopyEval) {
        btnCopyEval.addEventListener('click', () => {
            if (typeof PROMPT_CORRIGIR_DESAFIO !== 'undefined') {
                const originalText = textDisplay.innerText;
                const userRewrite = rewriteInput.value.trim();

                if (!originalText || !userRewrite) {
                    alert("Você precisa reescrever o texto primeiro!");
                    return;
                }

                let prompt = PROMPT_CORRIGIR_DESAFIO.replace("{TEXTO_ORIGINAL}", originalText);
                prompt = prompt.replace("{REESCRITA_ALUNO}", userRewrite);

                navigator.clipboard.writeText(prompt).then(() => {
                    alert("Prompt de Correção copiado! Cole no Gemini e traga o JSON.");
                    btnCopyEval.innerText = "Prompt Copiado ✔️";
                    setTimeout(() => { btnCopyEval.innerText = "Copiar Prompt: Corrigir Desafio"; }, 2000);
                }).catch(err => {
                    alert("Erro ao copiar: " + err);
                });
            }
        });
    }

    if (inputEval) {
        inputEval.addEventListener('input', () => {
            const val = inputEval.value.trim();
            if (!val) return;

            try {
                const result = parseGeminiJSON(val);
                if (result.nota !== undefined && result.feedback_geral) {
                    let html = `
                        <div style="background: rgba(var(--success-rgb), 0.1); border-left: 4px solid var(--success); padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                            <h4 style="color: var(--success); margin-bottom: 0.5rem;">Resultado: Nota ${result.nota}/100</h4>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem;">${(result.feedback_geral||"").replace(/\\n/g, '<br>')}</p>
                            <h5 style="margin-bottom: 0.5rem; font-size: 0.9rem;">Erros Analisados:</h5>
                            <ul style="margin-bottom: 1rem; padding-left: 1.5rem; font-size: 0.9rem;">
                    `;
                    
                    if (result.erros_encontrados) {
                        result.erros_encontrados.forEach(err => {
                            const icon = err.status === 'Corrigido' ? '✅' : '❌';
                            html += `<li>${icon} <strong>${err.status}</strong>: ${err.erro}</li>`;
                        });
                    }
                    
                    html += `
                            </ul>
                            <h5 style="margin-bottom: 0.5rem; font-size: 0.9rem;">Reescrita Ideal do Prof. Lino:</h5>
                            <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 4px; font-style: italic; border: 1px solid var(--panel-border);">
                                ${result.reescrita_ideal || ""}
                            </div>
                        </div>
                    `;
                    
                    responseArea.innerHTML = html;
                }
            } catch(e) {
                // Ignore while typing
            }
        });
    }
});
