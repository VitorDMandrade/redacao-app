// @ts-check

/**
 * @typedef {'same' | 'added' | 'removed'} DiffType
 */

/**
 * @typedef {Object} DiffToken
 * @property {DiffType} type
 * @property {string} value
 */

/**
 * Splits text into tokens: words and whitespaces/punctuation.
 * @param {string} text
 * @returns {string[]}
 */
export function tokenize(text) {
    if (!text) return [];
    return text.match(/\S+|\s+/g) || [];
}

/**
 * Computes the Longest Common Subsequence (LCS) based diff between two strings at token level.
 * @param {string} originalText
 * @param {string} revisedText
 * @returns {DiffToken[]}
 */
export function computeWordDiff(originalText, revisedText) {
    const origTokens = tokenize(originalText);
    const revTokens = tokenize(revisedText);

    const n = origTokens.length;
    const m = revTokens.length;

    // LCS Matrix
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (origTokens[i - 1] === revTokens[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack to build the diff
    let i = n;
    let j = m;
    /** @type {DiffToken[]} */
    const diff = [];

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && origTokens[i - 1] === revTokens[j - 1]) {
            diff.unshift({ type: 'same', value: origTokens[i - 1] });
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            diff.unshift({ type: 'added', value: revTokens[j - 1] });
            j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
            diff.unshift({ type: 'removed', value: origTokens[i - 1] });
            i--;
        }
    }

    return diff;
}
