// @ts-check

/**
 * Módulo de Feedback em Tempo Real
 * Atua como um co-piloto silencioso que avisa sobre repetições de palavras e estrutura básica.
 */

const stopWords = new Set([
    'a', 'o', 'e', 'é', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas',
    'por', 'para', 'com', 'sem',
    'um', 'uma', 'uns', 'umas',
    'que', 'se', 'como', 'mais', 'mas', 'ou',
    'sua', 'seu', 'suas', 'seus',
    'ao', 'aos', 'à', 'às', 'pelo', 'pela'
]);

export function initLiveFeedback() {
    const essayTextarea = document.getElementById('essay');
    const panel = document.getElementById('live-feedback-panel');
    const msgElement = document.getElementById('live-feedback-msg');

    if (!essayTextarea || !panel || !msgElement) {
        console.warn('Elementos do live feedback não encontrados.');
        return;
    }

    // Usando destructuring para evitar tipagem forte do TS em arquivos mistos
    essayTextarea.addEventListener('input', (e) => {
        // @ts-ignore
        const text = e.target.value || '';
        
        const feedback = analyzeText(text);
        
        if (feedback) {
            msgElement.textContent = feedback;
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    });
}

/**
 * @param {string} text 
 * @returns {string | null}
 */
function analyzeText(text) {
    if (!text || text.trim().length === 0) return null;

    // 1. Checagem de Repetição de Palavras
    const words = text.toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") // Remove pontuação
        .split(/\s+/) // Divide por espaço
        .filter(w => w.length > 2 && !stopWords.has(w)); // Ignora palavras muito curtas e stopwords

    /** @type {Record<string, number>} */
    const wordCounts = {};
    for (const w of words) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
    }

    // Verifica se alguma palavra (que não seja stopword) repete muito
    // Limite: 4 vezes no texto todo (poderia ser por parágrafo no futuro)
    for (const [word, count] of Object.entries(wordCounts)) {
        if (count > 4) {
            return `A palavra "${word.toUpperCase()}" já foi repetida ${count} vezes. Tente usar um sinônimo!`;
        }
    }

    // 2. Checagem de parágrafos muito longos (Básico)
    const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
    for (let i = 0; i < paragraphs.length; i++) {
        const pLength = paragraphs[i].split(/\s+/).length;
        if (pLength > 80) { // Um parágrafo de redação com mais de 80 palavras costuma estar longo demais
            return `O parágrafo ${i + 1} está muito longo (mais de 80 palavras). Considere dividi-lo com ponto final.`;
        }
    }

    // 3. Conexão Arena ↔ Co-piloto (Lê fraquezas salvas)
    try {
        const weaknesses = JSON.parse(localStorage.getItem('redacao_weaknesses') || '{}');
        let dominantWeakness = null;
        let maxErrors = 0;
        
        for (const [category, errors] of Object.entries(weaknesses)) {
            // @ts-ignore
            if (errors > 2 && errors > maxErrors) {
                // @ts-ignore
                maxErrors = errors;
                dominantWeakness = category;
            }
        }

        if (dominantWeakness) {
            return `⚠️ Atenção: Na Arena você identificou fragilidade em "${dominantWeakness}". Fique atento a isso nesta redação!`;
        }
    } catch(e) {
        console.warn('Erro ao ler fraquezas', e);
    }

    return null;
}

// Inicializa quando o módulo carrega (pois é type="module", executa após o parsing do HTML)
initLiveFeedback();
