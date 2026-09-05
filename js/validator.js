// @ts-check

/**
 * Radar de Conformidade Pré-Envio
 * Este validador roda localmente antes de enviar a redação para a Inteligência Artificial.
 * 
 * @param {string} text O texto da redação
 * @param {Object} currentBanca O objeto contendo as regras da banca atual (do bancas.js)
 * @param {string} title O título da redação
 * @returns {string | null} Retorna a string de erro se inválido, ou null se válido.
 */
export function validateEssay(text, currentBanca, title) {
    if (!text || text.trim().length < 50) {
        return "⚠️ Radar de Conformidade: Por favor, digite uma redação mais longa (mínimo 50 caracteres) para análise estrutural.";
    }

    if (currentBanca.exigeTitulo && (!title || title.trim() === '')) {
        return `⚠️ Radar de Conformidade: A banca ${currentBanca.nome} exige um título obrigatório. Por favor, preencha o campo de título antes de enviar.`;
    }

    const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
    
    // Alertas específicos por banca
    if (currentBanca.nome === 'ENEM' || currentBanca.nome === 'UEMA') {
        if (paragraphs.length < 3) {
            return `⚠️ Radar de Conformidade: Sua redação para a banca ${currentBanca.nome} possui apenas ${paragraphs.length} parágrafos. O padrão mínimo exigido são 3 ou 4 parágrafos estruturados (Introdução, Desenvolvimento, Conclusão).`;
        }
        if (paragraphs.length > 5) {
            return `⚠️ Radar de Conformidade: Sua redação possui ${paragraphs.length} parágrafos. Para bancas como ${currentBanca.nome}, recomendamos o formato clássico de 4 parágrafos. Considere reestruturar.`;
        }
    }

    return null; // Tudo OK
}
