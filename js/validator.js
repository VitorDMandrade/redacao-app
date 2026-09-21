// @ts-check

/**
 * Radar de Conformidade Pré-Envio
 * Este validador roda localmente antes de enviar a redação para a Inteligência Artificial,
 * prevenindo submissões com erros formais que zerariam a prova em cada banca.
 * 
 * @param {string} text O texto da redação
 * @param {Object} currentBanca O objeto contendo as regras da banca atual (do bancas.js)
 * @param {string} [title] O título da redação (opcional/obrigatório conforme a banca)
 * @returns {string | null} Retorna a string de erro se inválido, ou null se válido.
 */
export function validateEssay(text, currentBanca, title = '') {
    if (!text || text.trim().length < 50) {
        return "⚠️ Radar de Conformidade: Por favor, digite uma redação mais longa (mínimo 50 caracteres) para análise estrutural.";
    }

    if (!currentBanca) {
        return null;
    }

    const genero = (currentBanca.generosPermitidos && currentBanca.generosPermitidos[0]) || 'dissertativo';
    const cleanTitle = (title || '').trim();

    // 1. Validação de Título
    if (currentBanca.exigeTitulo && cleanTitle === '') {
        // Mensagem específica para UNITINS (o 'título' é a marcação do tema proposto)
        if (currentBanca.id === 'UNITINS') {
            return `⚠️ Radar de Conformidade: A banca ${currentBanca.nome} exige um título obrigatório como marcação temática (indique o tema proposto no campo de título, não um título criativo).`;
        }
        return `⚠️ Radar de Conformidade: A banca ${currentBanca.nome} exige um título obrigatório (Linha 1/marcação temática). Por favor, preencha o campo de título antes de enviar.`;
    }

    if (genero === 'carta' && cleanTitle !== '') {
        return `⚠️ Radar de Conformidade: O gênero Carta do Leitor (${currentBanca.nome}) não utiliza título. O texto deve iniciar diretamente pelo Local, Data e Vocativo.`;
    }

    // 2. Estimativa de Linhas Físicas e Validação de Limites
    const rawParagraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    const estimatedLines = rawParagraphs.reduce((acc, p) => {
        return acc + Math.max(1, Math.ceil(p.length / 94));
    }, 0);

    if (currentBanca.limiteLinhas) {
        const minLines = currentBanca.limiteLinhas.min || 8;
        const maxLines = currentBanca.limiteLinhas.max || 30;

        if (estimatedLines < minLines) {
            if (currentBanca.nome.includes('UEMA') || minLines === 15) {
                return `⚠️ Radar de Conformidade: A banca UEMA exige no mínimo 15 linhas escritas (sua redação possui cerca de ${estimatedLines} linhas). Textos com menos de 15 linhas são sumariamente eliminados com NOTA ZERO pelo edital oficial.`;
            }
            return `⚠️ Radar de Conformidade: A banca ${currentBanca.nome} exige no mínimo ${minLines} linhas (sua redação possui cerca de ${estimatedLines} linhas). Textos com menos de ${minLines} linhas recebem nota zero.`;
        }

        // Nota: O excesso de linhas (> maxLines) não bloqueia mais o envio da redação.
        // O aviso é emitido de forma não impeditiva pela função checkLineLimitWarning.
    }

    // 3. Validações Específicas para Gênero Carta do Leitor
    if (genero === 'carta') {
        const hasVocativo = /prezad[ao]|editor|editoria|redator|redação|senhor|car[oa]s/i.test(text);
        if (!hasVocativo) {
            return `⚠️ Radar de Conformidade: Não identificamos um Vocativo formal na sua Carta do Leitor (${currentBanca.nome}). Toda carta de discussão pública exige vocativo inicial (ex: "Prezados editores,", "Prezada editoria da Revista,").`;
        }

        // Checar despedida formal ("Atenciosamente", "Cordialmente", "Respeitosamente", "Com estima", etc.) e assinatura fictícia separadamente
        const hasDespedidaFormal = /atenciosamente|cordialmente|respeitosamente|com estima|com consideração|saudações/i.test(text);
        const hasAssinaturaFicticia = /leitor|leitora|cidad[aã]o|cidad[aã]|estudante|assinante|interessad[ao]/i.test(text);

        if (!hasDespedidaFormal) {
            return `⚠️ Radar de Conformidade: Não identificamos a despedida formal na sua Carta do Leitor (${currentBanca.nome}). Toda carta pública exige fechamento como: "Atenciosamente," ou "Cordialmente," antes da assinatura fictícia.`;
        }
        if (!hasAssinaturaFicticia) {
            return `⚠️ Radar de Conformidade: Não identificamos a assinatura fictícia na sua Carta do Leitor (${currentBanca.nome}). Assine com identificação neutra após a despedida (ex: "Um Leitor Atento", "Uma Estudante de Palmas"). ATENÇÃO: Nunca assine com seu nome real!`;
        }

        // Radar de risco gravíssimo: detecção de nome de pessoa após despedida
        const lastLines = text.trim().split('\n').slice(-4).join(' ');
        const personalNameRegex = /(?:atenciosamente|cordialmente|respeitosamente|por)\s*[,:\s]+\s*([A-ZÁÉÍÓÚÂÊÔÃÕ][a-záéíóúâêôãõç]+(?:\s+[A-ZÁÉÍÓÚÂÊÔÃÕ][a-záéíóúâêôãõç]+)+)/i;
        const matchName = personalNameRegex.exec(lastLines);
        if (matchName) {
            const nomeDetectado = matchName[1].trim();
            if (!/leitor|leitora|cidad[aã]o|estudante|assinante/i.test(nomeDetectado)) {
                return `⚠️ ALERTA GRAVÍSSIMO DE DESCLASSIFICAÇÃO: Detectamos uma possível assinatura com nome de pessoa ("${nomeDetectado}"). Na Carta do Leitor (${currentBanca.nome}), colocar nome real resulta em anulação/desclassificação imediata. Conclua com identificação neutra (ex: "Atenciosamente, / Um leitor atento").`;
            }
        }
    } else {
        // 4. Validações de Estrutura para Dissertativo-Argumentativo
        if (rawParagraphs.length < 3) {
            return `⚠️ Radar de Conformidade: Sua redação para a banca ${currentBanca.nome} possui apenas ${rawParagraphs.length} parágrafo(s). O padrão exigido são 4 parágrafos estruturados (Introdução, D1, D2 e Conclusão).`;
        }
        if (rawParagraphs.length > 5) {
            return `⚠️ Radar de Conformidade: Sua redação possui ${rawParagraphs.length} parágrafos. Para bancas como ${currentBanca.nome}, recomendamos rigorosamente o formato clássico de 4 parágrafos bem fundamentados.`;
        }
    }

    return null; // Tudo em total conformidade
}

/**
 * Alerta de Limite Máximo de Linhas (Não Bloqueante)
 * Informa ao estudante caso a redação ultrapasse a extensão permitida da banca,
 * alertando que provavelmente não caberia na folha de redação tradicional, mas sem impedir o envio.
 * 
 * @param {string} text O texto da redação
 * @param {Object} currentBanca O objeto contendo as regras da banca atual
 * @returns {string | null} Mensagem de aviso se exceder o limite, ou null se estiver dentro do limite.
 */
export function checkLineLimitWarning(text, currentBanca) {
    if (!text || !currentBanca || !currentBanca.limiteLinhas) return null;
    const rawParagraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    const estimatedLines = rawParagraphs.reduce((acc, p) => {
        return acc + Math.max(1, Math.ceil(p.length / 94));
    }, 0);
    const maxLines = currentBanca.limiteLinhas.max || 30;

    if (estimatedLines > maxLines) {
        return `⚠️ Radar de Conformidade: Sua redação possui cerca de ${estimatedLines} linhas e ultrapassa o limite permitido de ${maxLines} linhas da banca ${currentBanca.nome}. Provavelmente ela não caberia na folha de redação tradicional, mas estamos enviando para análise de qualquer jeito!`;
    }

    return null;
}
