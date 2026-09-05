// @ts-check

const stopWords = new Set([
    'a', 'o', 'e', 'é', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas',
    'por', 'para', 'com', 'sem',
    'um', 'uma', 'uns', 'umas',
    'que', 'se', 'como', 'mais', 'mas', 'ou',
    'sua', 'seu', 'suas', 'seus',
    'ao', 'aos', 'à', 'às', 'pelo', 'pela'
]);

self.onmessage = (event) => {
    const { rawText } = event.data;
    
    if (!rawText || rawText.trim().length === 0) {
        self.postMessage({ feedback: null });
        return;
    }

    // 1. Checagem de Repetição de Palavras
    const words = rawText.toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.has(w));

    /** @type {Record<string, number>} */
    const wordCounts = {};
    for (const w of words) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
    }

    for (const [word, count] of Object.entries(wordCounts)) {
        if (count > 4) {
            self.postMessage({ feedback: `A palavra "${word.toUpperCase()}" já foi repetida ${count} vezes. Tente usar um sinônimo!` });
            return;
        }
    }

    // 2. Checagem de parágrafos muito longos (> 80 palavras)
    const paragraphs = rawText.split('\n').filter(p => p.trim().length > 0);
    for (let i = 0; i < paragraphs.length; i++) {
        const pLength = paragraphs[i].split(/\s+/).length;
        if (pLength > 80) {
            self.postMessage({ feedback: `O parágrafo ${i + 1} está muito longo (mais de 80 palavras). Considere dividi-lo com ponto final.` });
            return;
        }
    }

    // 3. Regras de Queísmo
    const queCount = (rawText.toLowerCase().match(/\bque\b/g) || []).length;
    if (queCount > 7) {
        self.postMessage({ feedback: `Atenção ao Queísmo: O pronome "que" foi usado ${queCount} vezes. Tente substituí-lo por "o qual" ou reformular as orações.` });
        return;
    }

    // 4. Regras de Gerúndios Fracos
    const gerundios = (rawText.toLowerCase().match(/\b\w+ndo\b/g) || []).length;
    if (gerundios > 4) {
        self.postMessage({ feedback: `Atenção: Uso excessivo de gerúndios (${gerundios} encontrados). Verifique se não há gerundismo que empobreça o texto.` });
        return;
    }

    self.postMessage({ feedback: null });
};
