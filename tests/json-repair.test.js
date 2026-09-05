const test = require('node:test');
const assert = require('node:assert');

test('JSON Repair Module', async (t) => {
  const { safeParseLLMJson } = await import('../js/json-repair.js');

  await t.test('Deve parsear JSON normal sem erros', () => {
    const raw = '{"chave": "valor", "numero": 123}';
    const parsed = safeParseLLMJson(raw);
    assert.deepStrictEqual(parsed, { chave: 'valor', numero: 123 });
  });

  await t.test('Deve lidar com aspas soltas internas no meio da string', () => {
    const raw = '{"comentario": "Ele disse "olá" e foi embora", "outro": "normal"}';
    const parsed = safeParseLLMJson(raw);
    assert.strictEqual(parsed.comentario, 'Ele disse "olá" e foi embora');
  });

  await t.test('Deve lidar com quebra de linha literal', () => {
    const raw = `{"texto": "linha um\nlinha dois\r\nlinha tres"}`;
    const parsed = safeParseLLMJson(raw);
    assert.strictEqual(parsed.texto, "linha um\nlinha dois\nlinha tres");
  });

  await t.test('Deve lidar com blocos markdown markdown e trailing comma', () => {
    const raw = `
\`\`\`json
{
  "nome": "teste",
}
\`\`\`
    `;
    const parsed = safeParseLLMJson(raw);
    assert.deepStrictEqual(parsed, { nome: "teste" });
  });

  await t.test('Caso extremo do usuario - Alienação', () => {
    const raw = `
{
  "tema": "A questão indígena no Brasil",
  "reescrita": "incentivar as manifestações identitárias do país -, em parceria com
a mídia pública e educadores, estruturar campanhas nacionais de
difusão das tradições locais.",
  "comentario": "O aluno utilizou a palavra "alienação" de maneira assertiva, mas faltou repertório",
  "nota": 920,
}
    `;
    const parsed = safeParseLLMJson(raw);
    assert.strictEqual(parsed.nota, 920);
    assert.strictEqual(parsed.comentario, 'O aluno utilizou a palavra "alienação" de maneira assertiva, mas faltou repertório');
    assert.ok(parsed.reescrita.includes('nacionais de\ndifusão das'));
  });

  await t.test('Caso real extremo - Arrays de Strings e Aspas Duplas (ADR-06)', () => {
    const raw = `
{
  "erros": [
    {
      "trecho_original": "Sob esse viés",
      "sugestao": [
        "Nesse contexto",
        "Sob esse prisma analítico",
        "Nessa perspectiva teórica"
      ],
      "explicacao": "Amplie a variedade de operadores.",
      "tipo": "Coesão"
    },
    {
      "trecho_original": "Filósofo françes Guy Debord, em sua obra "A sociedade do espetáculo" ,visa a perda",
      "sugestao": "filósofo francês Guy Debord, em sua obra "A Sociedade do Espetáculo", visa à perda",
      "explicacao": "Erro de crase e letra minúscula.",
      "tipo": "Gramática"
    }
  ]
}
    `;
    const parsed = safeParseLLMJson(raw);
    
    assert.strictEqual(Array.isArray(parsed.erros), true);
    assert.strictEqual(parsed.erros.length, 2);
    
    // Arrays devem ser parseados como listas corretamente, e não destruídos pelas aspas
    assert.deepStrictEqual(parsed.erros[0].sugestao, [
      "Nesse contexto",
      "Sob esse prisma analítico",
      "Nessa perspectiva teórica"
    ]);

    // Aspas no meio de citações de livros devem ser devidamente tratadas
    assert.strictEqual(parsed.erros[1].trecho_original, 'Filósofo françes Guy Debord, em sua obra "A sociedade do espetáculo" ,visa a perda');
    assert.strictEqual(parsed.erros[1].sugestao, 'filósofo francês Guy Debord, em sua obra "A Sociedade do Espetáculo", visa à perda');
  });
});
