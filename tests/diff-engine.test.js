import { test } from 'node:test';
import assert from 'node:assert';
import { tokenize, computeWordDiff } from '../src/utils/diff-engine.js';

test('tokenize splits words and spaces', () => {
    const text = "Portanto, o problema persiste.";
    const tokens = tokenize(text);
    assert.deepStrictEqual(tokens, ["Portanto,", " ", "o", " ", "problema", " ", "persiste."]);
});

test('computeWordDiff word substitution', () => {
    const original = "ter problema";
    const revised = "apresentar entrave";
    const diff = computeWordDiff(original, revised);
    assert.deepStrictEqual(diff, [
        { type: 'removed', value: 'ter' },
        { type: 'added', value: 'apresentar' },
        { type: 'same', value: ' ' },
        { type: 'removed', value: 'problema' },
        { type: 'added', value: 'entrave' }
    ]);
});

test('computeWordDiff insertion', () => {
    const original = "o problema persiste.";
    const revised = "Portanto, o problema persiste.";
    const diff = computeWordDiff(original, revised);
    assert.strictEqual(diff[0].type, 'added');
    assert.strictEqual(diff[0].value, 'Portanto,');
    assert.strictEqual(diff[1].type, 'added');
    assert.strictEqual(diff[1].value, ' ');
    assert.strictEqual(diff[2].type, 'same');
    assert.strictEqual(diff[2].value, 'o');
});

test('computeWordDiff removal', () => {
    const original = "ajudando a resolver o caso";
    const revised = "resolver o caso";
    const diff = computeWordDiff(original, revised);
    assert.strictEqual(diff[0].type, 'removed');
    assert.strictEqual(diff[0].value, 'ajudando');
    assert.strictEqual(diff[1].type, 'removed');
    assert.strictEqual(diff[1].value, ' ');
    assert.strictEqual(diff[2].type, 'removed');
    assert.strictEqual(diff[2].value, 'a');
    assert.strictEqual(diff[3].type, 'removed');
    assert.strictEqual(diff[3].value, ' ');
    assert.strictEqual(diff[4].type, 'same');
    assert.strictEqual(diff[4].value, 'resolver');
});
