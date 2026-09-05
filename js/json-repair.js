// @ts-check

/**
 * Higieniza e repara strings JSON malformadas geradas por LLMs contendo
 * quebras de linha literais, aspas duplas internas não escapadas e trailing commas.
 * 
 * @param {string} raw - Texto bruto contendo ou representando o JSON.
 * @returns {any} Objeto JavaScript parsed com sucesso.
 * @throws {SyntaxError} Caso a estrutura do JSON seja irreparável.
 */
export function safeParseLLMJson(raw) {
  if (typeof raw !== 'string' || !raw.trim()) {
    throw new TypeError('Entrada inválida: esperado string não vazia.');
  }

  // 1. Remoção de blocos markdown ```json ... ```
  let clean = raw.trim();
  clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

  // 2. Extração da fronteira externa do JSON ({...} ou [...])
  const firstBrace = clean.indexOf('{');
  const firstBracket = clean.indexOf('[');
  let startIdx = -1;
  let endIdx = -1;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
    endIdx = clean.lastIndexOf('}');
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
    endIdx = clean.lastIndexOf(']');
  }

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    clean = clean.slice(startIdx, endIdx + 1);
  }

  // 3. Máquina de Estados: Sanitização de aspas internas e quebras de linha
  const out = [];
  const n = clean.length;
  let inString = false;
  let isKey = false;
  let i = 0;

  while (i < n) {
    const c = clean[i];

    if (!inString) {
      if (c === '"') {
        inString = true;
        // Identifica se a aspa inicia uma chave (precedida por { ou ,)
        let prevChar = null;
        for (let k = out.length - 1; k >= 0; k--) {
          if (!/\s/.test(out[k])) {
            prevChar = out[k];
            break;
          }
        }
        isKey = prevChar === '{' || prevChar === ',';
        out.push(c);
      } else {
        out.push(c);
      }
      i++;
    } else {
      // Dentro de uma string
      if (c === '\\') {
        // Caractere com escape preservado
        out.push(c);
        if (i + 1 < n) {
          out.push(clean[i + 1]);
          i += 2;
        } else {
          i++;
        }
      } else if (c === '\n' || c === '\r') {
        // Quebra de linha literal dentro da string: substitui por \n
        if (c === '\r' && i + 1 < n && clean[i + 1] === '\n') {
          i++;
        }
        out.push('\\n');
        i++;
      } else if (c === '\t') {
        out.push('\\t');
        i++;
      } else if (c === '"') {
        // Lookahead: verifica se é fechamento legítimo da string
        let j = i + 1;
        while (j < n && /\s/.test(clean[j])) {
          j++;
        }
        const nextChar = j < n ? clean[j] : '';

        let isClosing = false;
        if (isKey) {
          // A chave fecha obrigatoriamente antes dos dois pontos (:)
          isClosing = nextChar === ':';
        } else {
          // O valor fecha antes de vírgula, chaves ou colchetes
          if (nextChar === '}' || nextChar === ']' || nextChar === '') {
            isClosing = true;
          } else if (nextChar === ',') {
            // Valida se após a vírgula há um próximo token válido de JSON
            let k = j + 1;
            while (k < n && /\s/.test(clean[k])) {
              k++;
            }
            const afterComma = k < n ? clean[k] : '';
            isClosing = /["{\[\}\]\-\dtfn]/.test(afterComma);
          }
        }

        if (isClosing) {
          inString = false;
          out.push('"');
        } else {
          // Aspa interna desprotegida: aplica escape
          out.push('\\"');
        }
        i++;
      } else {
        out.push(c);
        i++;
      }
    }
  }

  // 4. Remoção de trailing commas antes de fechamento de objetos/arrays (falha comum de LLM)
  const repairedJson = out.join('').replace(/,\s*([\}\]])/g, '$1');

  // 5. Execução do parse nativo
  return JSON.parse(repairedJson);
}
