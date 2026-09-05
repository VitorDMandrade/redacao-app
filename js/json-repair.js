// @ts-check

/**
 * Higieniza e repara strings JSON malformadas geradas por LLMs contendo
 * quebras de linha literais, aspas duplas internas não escapadas, arrays de strings
 * e trailing commas.
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

  // 3. Máquina de Estados com Context Stack (diferencia Object de Array)
  const out = [];
  const n = clean.length;
  let inString = false;
  /** @type {('OBJECT' | 'ARRAY')[]} */
  const contextStack = [];
  let expectingKey = false;
  let currentIsKey = false;
  let i = 0;

  while (i < n) {
    const c = clean[i];

    if (!inString) {
      if (c === '{') {
        contextStack.push('OBJECT');
        expectingKey = true;
        out.push(c);
      } else if (c === '[') {
        contextStack.push('ARRAY');
        out.push(c);
      } else if (c === '}') {
        if (contextStack.length > 0 && contextStack[contextStack.length - 1] === 'OBJECT') {
          contextStack.pop();
        }
        expectingKey = false;
        out.push(c);
      } else if (c === ']') {
        if (contextStack.length > 0 && contextStack[contextStack.length - 1] === 'ARRAY') {
          contextStack.pop();
        }
        out.push(c);
      } else if (c === ':') {
        expectingKey = false;
        out.push(c);
      } else if (c === ',') {
        if (contextStack.length > 0 && contextStack[contextStack.length - 1] === 'OBJECT') {
          expectingKey = true;
        }
        out.push(c);
      } else if (c === '"') {
        inString = true;
        currentIsKey = (contextStack.length > 0 && contextStack[contextStack.length - 1] === 'OBJECT' && expectingKey);
        out.push(c);
      } else {
        out.push(c);
      }
      i++;
    } else {
      // Dentro de uma string
      if (c === '\\') {
        out.push(c);
        if (i + 1 < n) {
          out.push(clean[i + 1]);
          i += 2;
        } else {
          i++;
        }
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && i + 1 < n && clean[i + 1] === '\n') {
          i++;
        }
        out.push('\\n');
        i++;
      } else if (c === '\t') {
        out.push('\\t');
        i++;
      } else if (c === '"') {
        // Lookahead para determinar se a aspa é fechamento real ou aspa interna de citação
        let j = i + 1;
        while (j < n && /\s/.test(clean[j])) {
          j++;
        }
        const nextChar = j < n ? clean[j] : '';

        let isClosing = false;
        if (currentIsKey) {
          // Chave de objeto encerra obrigatoriamente antes de ':'
          isClosing = (nextChar === ':');
        } else {
          const currentContext = contextStack.length > 0 ? contextStack[contextStack.length - 1] : null;

          if (currentContext === 'ARRAY') {
            // Em array, valor de string fecha antes de ']' ou ',' seguido de novo item/colchete
            if (nextChar === ']' || nextChar === '') {
              isClosing = true;
            } else if (nextChar === ',') {
              let k = j + 1;
              while (k < n && /\s/.test(clean[k])) {
                k++;
              }
              const afterComma = k < n ? clean[k] : '';
              isClosing = /["{\[\}\]\-\dtfn]/.test(afterComma);
            }
          } else if (currentContext === 'OBJECT') {
            // Em objeto, valor fecha antes de '}' ou ',' seguido da PRÓXIMA chave válida ("chave":)
            if (nextChar === '}' || nextChar === '') {
              isClosing = true;
            } else if (nextChar === ',') {
              let k = j + 1;
              while (k < n && /\s/.test(clean[k])) {
                k++;
              }
              const rest = clean.slice(k);
              // Valida se o que segue a vírgula é outra chave com dois-pontos ou fechamento de bloco
              if (rest.startsWith('}')) {
                isClosing = true;
              } else if (rest.startsWith('"')) {
                // Regex para checar se é "nome_propriedade":
                isClosing = /^"[^"\\\r\n]+":/.test(rest);
              } else {
                isClosing = false;
              }
            }
          } else {
            isClosing = (nextChar === ',' || nextChar === '}' || nextChar === ']' || nextChar === '');
          }
        }

        if (isClosing) {
          inString = false;
          currentIsKey = false;
          out.push('"');
        } else {
          // Aspa interna solta: aplica escape cirúrgico
          out.push('\\"');
        }
        i++;
      } else {
        out.push(c);
        i++;
      }
    }
  }

  // 4. Limpeza de trailing commas antes de } ou ]
  const repairedJson = out.join('').replace(/,\s*([\}\]])/g, '$1');

  // 5. Execução do parse nativo
  return JSON.parse(repairedJson);
}
