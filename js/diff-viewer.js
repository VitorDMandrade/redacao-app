// @ts-check
import { computeWordDiff } from '../src/utils/diff-engine.js';

/**
 * Injeta o componente visual de diff ("Modo Confronto") dentro de um container da reescrita.
 * @param {HTMLElement} containerElement 
 * @param {string} originalText 
 * @param {string} rewrittenText 
 */
export function initDiffViewer(containerElement, originalText, rewrittenText) {
    if (!containerElement || !originalText || !rewrittenText) return;

    // Criar os botões de alternância
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'diff-controls';
    controlsDiv.style.marginBottom = '1rem';
    controlsDiv.style.display = 'flex';
    controlsDiv.style.gap = '0.5rem';

    const btnClean = document.createElement('button');
    btnClean.textContent = 'Versão Lapidada';
    btnClean.className = 'btn btn-primary diff-toggle active';
    btnClean.style.padding = '4px 12px';
    btnClean.style.borderRadius = '20px';
    btnClean.style.border = 'none';
    btnClean.style.cursor = 'pointer';
    btnClean.style.fontWeight = 'bold';

    const btnDiff = document.createElement('button');
    btnDiff.textContent = 'Modo Confronto (Diff)';
    btnDiff.className = 'btn diff-toggle';
    btnDiff.style.padding = '4px 12px';
    btnDiff.style.borderRadius = '20px';
    btnDiff.style.border = '1px solid var(--border-color)';
    btnDiff.style.background = 'transparent';
    btnDiff.style.color = 'var(--text-color)';
    btnDiff.style.cursor = 'pointer';

    controlsDiv.appendChild(btnClean);
    controlsDiv.appendChild(btnDiff);

    // Criar o container de exibição
    const contentDiv = document.createElement('div');
    contentDiv.className = 'diff-content';

    const cleanView = document.createElement('div');
    cleanView.className = 'diff-clean-view';
    cleanView.innerHTML = rewrittenText.replace(/\n/g, '<br>');

    const diffView = document.createElement('div');
    diffView.className = 'diff-container diff-confronto-view hidden';
    diffView.style.display = 'none';

    // Processar o Diff
    const diffTokens = computeWordDiff(originalText, rewrittenText);
    const fragment = document.createDocumentFragment();

    diffTokens.forEach(token => {
        let span;
        if (token.type === 'same') {
            span = document.createElement('span');
            span.textContent = token.value;
        } else if (token.type === 'added') {
            span = document.createElement('ins');
            span.className = 'diff-added';
            span.textContent = token.value;
        } else if (token.type === 'removed') {
            span = document.createElement('del');
            span.className = 'diff-removed';
            span.textContent = token.value;
        }
        if (span) {
            fragment.appendChild(span);
        }
    });

    diffView.appendChild(fragment);

    contentDiv.appendChild(cleanView);
    contentDiv.appendChild(diffView);

    // Adicionar eventos de alternância
    btnClean.addEventListener('click', () => {
        btnClean.className = 'btn btn-primary diff-toggle active';
        btnClean.style.background = 'var(--primary, #3b82f6)';
        btnClean.style.color = 'white';
        btnClean.style.border = 'none';

        btnDiff.className = 'btn diff-toggle';
        btnDiff.style.background = 'transparent';
        btnDiff.style.color = 'var(--text-color)';
        btnDiff.style.border = '1px solid var(--border-color)';

        cleanView.style.display = 'block';
        diffView.style.display = 'none';
    });

    btnDiff.addEventListener('click', () => {
        btnDiff.className = 'btn btn-primary diff-toggle active';
        btnDiff.style.background = 'var(--primary, #3b82f6)';
        btnDiff.style.color = 'white';
        btnDiff.style.border = 'none';

        btnClean.className = 'btn diff-toggle';
        btnClean.style.background = 'transparent';
        btnClean.style.color = 'var(--text-color)';
        btnClean.style.border = '1px solid var(--border-color)';

        cleanView.style.display = 'none';
        diffView.style.display = 'block';
    });

    // Limpar o container antigo e injetar o novo
    containerElement.innerHTML = '';
    containerElement.appendChild(controlsDiv);
    containerElement.appendChild(contentDiv);
}
