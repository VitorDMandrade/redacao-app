
// ==========================================
// DESAFIO GRAMATICAL COM IA (GEMINI API)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('gemini-api-key');
    const btnGenerate = document.getElementById('btn-generate-grammar-challenge');
    const btnEvaluate = document.getElementById('btn-evaluate-grammar-challenge');
    
    const displayArea = document.getElementById('grammar-challenge-display');
    const textDisplay = document.getElementById('grammar-challenge-text');
    const hintDisplay = document.getElementById('grammar-challenge-hint');
    const rewriteInput = document.getElementById('grammar-challenge-rewrite');
    const responseArea = document.getElementById('grammar-challenge-response');

    // Carregar chave salva
    const savedKey = localStorage.getItem('redacao_gemini_key');
    if (savedKey && apiKeyInput) {
        apiKeyInput.value = savedKey;
    }

    if (apiKeyInput) {
        apiKeyInput.addEventListener('change', (e) => {
            localStorage.setItem('redacao_gemini_key', e.target.value.trim());
        });
    }

    async function callGemini(promptText) {
        const key = apiKeyInput ? apiKeyInput.value.trim() : '';
        if (!key) {
            throw new Error("Por favor, insira sua Chave API do Gemini.");
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }],
                generationConfig: {
                    temperature: 0.7,
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(()=>({}));
            throw new Error(`Erro na API: ${response.status} - ${errData?.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const responseText = data.candidates[0].content.parts[0].text;
        
        try {
            return JSON.parse(responseText);
        } catch(e) {
            // Em caso do modelo retornar com marcações markdown
            const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleaned);
        }
    }

    if (btnGenerate) {
        btnGenerate.addEventListener('click', async () => {
            if (typeof PROMPT_GERAR_DESAFIO === 'undefined') {
                alert("O prompt de geração (PROMPT_GERAR_DESAFIO) não foi encontrado.");
                return;
            }

            try {
                btnGenerate.disabled = true;
                btnGenerate.innerHTML = "<span>Gerando Desafio (Aguarde...) ⏳</span>";
                responseArea.innerHTML = '';
                
                const result = await callGemini(PROMPT_GERAR_DESAFIO);
                
                textDisplay.innerText = result.texto_problematico;
                hintDisplay.innerText = "Dica: " + result.dica;
                rewriteInput.value = '';
                
                displayArea.classList.remove('hidden');
                btnEvaluate.style.display = 'block';
                
            } catch (err) {
                alert(err.message);
            } finally {
                btnGenerate.disabled = false;
                btnGenerate.innerHTML = "<span>Gerar Desafio Automaticamente 🤖</span>";
            }
        });
    }

    if (btnEvaluate) {
        btnEvaluate.addEventListener('click', async () => {
            if (typeof PROMPT_CORRIGIR_DESAFIO === 'undefined') {
                alert("O prompt de correção (PROMPT_CORRIGIR_DESAFIO) não foi encontrado.");
                return;
            }

            const originalText = textDisplay.innerText;
            const userRewrite = rewriteInput.value.trim();

            if (!originalText || !userRewrite) {
                alert("Você precisa reescrever o texto antes de corrigir!");
                return;
            }

            try {
                btnEvaluate.disabled = true;
                btnEvaluate.innerHTML = "<span>Corrigindo... ⏳</span>";
                
                let prompt = PROMPT_CORRIGIR_DESAFIO.replace("{TEXTO_ORIGINAL}", originalText);
                prompt = prompt.replace("{REESCRITA_ALUNO}", userRewrite);
                
                const result = await callGemini(prompt);
                
                let html = `
                    <div style="background: rgba(var(--success-rgb), 0.1); border-left: 4px solid var(--success); padding: 1rem; border-radius: 4px; margin-top: 1rem;">
                        <h4 style="color: var(--success); margin-bottom: 0.5rem;">Resultado: Nota ${result.nota}/100</h4>
                        <p style="margin-bottom: 1rem; font-size: 0.95rem;">${result.feedback_geral.replace(/\\n/g, '<br>')}</p>
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
                            ${result.reescrita_ideal}
                        </div>
                    </div>
                `;
                
                responseArea.innerHTML = html;
                
            } catch (err) {
                alert(err.message);
            } finally {
                btnEvaluate.disabled = false;
                btnEvaluate.innerHTML = "<span>Copiador Inteligente: Corrigir Desafio</span>";
            }
        });
    }
});
