// @ts-check

/**
 * @typedef {Object} ParagraphMetrics
 * @property {number} index - Índice do parágrafo (0 a 3).
 * @property {string} label - Rótulo semântico (Introdução, D1, D2, Conclusão).
 * @property {number} charsWithSpaces - Total de caracteres incluindo espaços.
 * @property {number} charsNoSpaces - Total de caracteres sem espaços.
 * @property {number} wordsCount - Total de palavras.
 * @property {number} estimatedLines - Linhas físicas estimadas na folha manuscrita.
 * @property {number} targetLines - Linhas alvo para a estrutura ideal.
 * @property {boolean} isOverflown - Indica se ultrapassou o orçamento do parágrafo.
 */

/**
 * @typedef {Object} EssayAnalysisResult
 * @property {number} totalCharsWithSpaces - Total absoluto de caracteres com espaços.
 * @property {number} totalCharsNoSpaces - Total de caracteres úteis.
 * @property {number} totalWords - Total de palavras.
 * @property {number} totalEstimatedLines - Linhas manuscritas projetadas.
 * @property {number} remainingLines - Linhas disponíveis na folha de 30 linhas.
 * @property {ParagraphMetrics[]} paragraphs - Métricas detalhadas por parágrafo.
 * @property {'UNDER_LIMIT' | 'IDEAL' | 'OVER_LIMIT'} status - Estado global da folha.
 */

export const ESSAY_CONSTRAINTS = Object.freeze({
  CHARS_PER_LINE_AVG: 94,
  TOTAL_MAX_LINES: 30,
  TARGET_MIN_CHARS: 2650,
  TARGET_MAX_CHARS: 2950,
  PARAGRAPH_TARGETS: [
    { label: 'Introdução', targetLines: 7, maxChars: 680 },
    { label: 'Desenvolvimento 1', targetLines: 8, maxChars: 780 },
    { label: 'Desenvolvimento 2', targetLines: 8, maxChars: 780 },
    { label: 'Conclusão', targetLines: 7, maxChars: 720 },
  ],
});

/**
 * Analisa o texto bruto de uma redação e projeta o consumo na folha de 30 linhas.
 * @param {string} rawText - Texto completo da redação (separado por quebras de linha duplas ou simples).
 * @returns {EssayAnalysisResult}
 */
export function analyzeEssayText(rawText) {
  if (typeof rawText !== 'string') {
    throw new TypeError('O parâmetro rawText deve ser uma string.');
  }

  // Sanitização e quebra de parágrafos preservando blocos reais
  const rawParagraphs = rawText
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  let totalCharsWithSpaces = 0;
  let totalCharsNoSpaces = 0;
  let totalWords = 0;
  let totalEstimatedLines = 0;

  /** @type {ParagraphMetrics[]} */
  const paragraphs = rawParagraphs.map((text, idx) => {
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    const wordsCount = text.split(/\s+/).filter(Boolean).length;
    
    // Projeção baseada na caligrafia (mínimo de 1 linha caso haja texto)
    const estimatedLines = Math.max(1, Math.ceil(charsWithSpaces / ESSAY_CONSTRAINTS.CHARS_PER_LINE_AVG));

    const config = ESSAY_CONSTRAINTS.PARAGRAPH_TARGETS[idx] || {
      label: `Parágrafo ${idx + 1}`,
      targetLines: 7,
      maxChars: 750,
    };

    totalCharsWithSpaces += charsWithSpaces;
    totalCharsNoSpaces += charsNoSpaces;
    totalWords += wordsCount;
    totalEstimatedLines += estimatedLines;

    return {
      index: idx,
      label: config.label,
      charsWithSpaces,
      charsNoSpaces,
      wordsCount,
      estimatedLines,
      targetLines: config.targetLines,
      isOverflown: estimatedLines > config.targetLines,
    };
  });

  const remainingLines = ESSAY_CONSTRAINTS.TOTAL_MAX_LINES - totalEstimatedLines;

  /** @type {'UNDER_LIMIT' | 'IDEAL' | 'OVER_LIMIT'} */
  let status = 'IDEAL';
  if (totalEstimatedLines < 27) {
    status = 'UNDER_LIMIT';
  } else if (totalEstimatedLines > ESSAY_CONSTRAINTS.TOTAL_MAX_LINES) {
    status = 'OVER_LIMIT';
  }

  return {
    totalCharsWithSpaces,
    totalCharsNoSpaces,
    totalWords,
    totalEstimatedLines,
    remainingLines,
    paragraphs,
    status,
  };
}
