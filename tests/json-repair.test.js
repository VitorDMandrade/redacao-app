const test = require('node:test');
const assert = require('node:assert');

// We have to import the ESM module or require if it's commonjs. Since we used `export function`, it's an ES module.
// But the project might not be using type: "module" in package.json.
// Let's use dynamic import.
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
});
