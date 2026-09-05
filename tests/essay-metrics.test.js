// @ts-check
import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeEssayText, ESSAY_CONSTRAINTS } from '../src/utils/essay-metrics.js';

test('Deve projetar exatamente as 30 linhas para um texto calibrado no limite', () => {
  // Simula 4 parágrafos com exatamente 94 chars por linha
  const intro = 'A'.repeat(7 * ESSAY_CONSTRAINTS.CHARS_PER_LINE_AVG);
  const d1 = 'B'.repeat(8 * ESSAY_CONSTRAINTS.CHARS_PER_LINE_AVG);
  const d2 = 'C'.repeat(8 * ESSAY_CONSTRAINTS.CHARS_PER_LINE_AVG);
  const conc = 'D'.repeat(7 * ESSAY_CONSTRAINTS.CHARS_PER_LINE_AVG);

  const fullEssay = `${intro}\n\n${d1}\n\n${d2}\n\n${conc}`;
  const result = analyzeEssayText(fullEssay);

  assert.equal(result.totalEstimatedLines, 30);
  assert.equal(result.remainingLines, 0);
  assert.equal(result.status, 'IDEAL');
  assert.equal(result.paragraphs.length, 4);
});

test('Deve sinalizar overflow quando ultrapassar as 30 linhas', () => {
  const overflownText = 'X'.repeat(32 * ESSAY_CONSTRAINTS.CHARS_PER_LINE_AVG);
  const result = analyzeEssayText(overflownText);

  assert.equal(result.status, 'OVER_LIMIT');
  assert.ok(result.totalEstimatedLines > 30);
});
