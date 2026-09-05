// @ts-check

/**
 * Módulo de Feedback em Tempo Real & HUD de Telemetria Caligráfica
 * Atua como um co-piloto silencioso que projeta o consumo físico da folha e monitora regras textuais.
 */

import { analyzeEssayText } from '../src/utils/essay-metrics.js';

const stopWords = new Set([
    'a', 'o', 'e', 'é', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas',
    'por', 'para', 'com', 'sem',
    'um', 'uma', 'uns', 'umas',
    'que', 'se', 'como', 'mais', 'mas', 'ou',
    'sua', 'seu', 'suas', 'seus',
    'ao', 'aos', 'à', 'às', 'pelo', 'pela'
]);

const PARAGRAPH_ABBR = ['Intro', 'Desenv 1', 'Desenv 2', 'Conclusão'];
const TARGET_TOTAL_CHARS = 2820;

/**
 * Utilitário de Debounce para prevenir layout thrashing na digitação rápida
 * @param {Function} fn 
 * @param {number} delay 
 */
function debounce(fn, delay = 350) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Garante a criação do container do HUD de Telemetria Caligráfica no DOM
 * @returns {HTMLElement}
 */
function ensureTelemetryHud() {
    let hud = document.getElementById('telemetria-caligrafica-hud');
    if (hud) return hud;

    hud = document.createElement('div');
    hud.id = 'telemetria-caligrafica-hud';
    hud.className = 'telemetria-hud';
    hud.innerHTML = `
        <div class="telemetria-section telemetria-lines-section">
            <span class="telemetria-label">Folha:</span>
            <span id="telemetria-lines-val" class="telemetria-lines-badge status-under">0 / 30 linhas estimadas</span>
        </div>
        <div class="telemetria-section telemetria-badges-section" id="telemetria-paragraphs-badges">
            <span class="telemetria-p-badge" title="Introdução">Intro: 0/7L</span>
            <span class="telemetria-p-badge" title="Desenvolvimento 1">Desenv 1: 0/8L</span>
            <span class="telemetria-p-badge" title="Desenvolvimento 2">Desenv 2: 0/8L</span>
            <span class="telemetria-p-badge" title="Conclusão">Conclusão: 0/7L</span>
        </div>
        <div class="telemetria-section telemetria-density-section">
            <span class="telemetria-chars-text" id="telemetria-chars-val">0 / 2.820 carac.</span>
            <div class="telemetria-progress-track">
                <div class="telemetria-progress-fill fill-under" id="telemetria-progress-fill" style="width: 0%;"></div>
            </div>
        </div>
    `;

    // Posiciona logo antes do .paper-container (ou acima do feedback panel)
    const paperContainer = document.querySelector('.paper-container');
    if (paperContainer && paperContainer.parentNode) {
        paperContainer.parentNode.insertBefore(hud, paperContainer);
    } else {
        const livePanel = document.getElementById('live-feedback-panel');
        if (livePanel && livePanel.parentNode) {
            livePanel.parentNode.insertBefore(hud, livePanel.nextSibling);
        } else {
            document.body.appendChild(hud);
        }
    }

    return hud;
}

/**
 * Atualiza o HUD de Telemetria Caligráfica com base na análise matemática
 * @param {HTMLElement} hud 
 * @param {string} rawText 
 */
function updateTelemetryHud(hud, rawText) {
    if (!hud) return;

    const linesValEl = hud.querySelector('#telemetria-lines-val');
    const badgesContainer = hud.querySelector('#telemetria-paragraphs-badges');
    const charsValEl = hud.querySelector('#telemetria-chars-val');
    const progressFill = /** @type {HTMLElement|null} */ (hud.querySelector('#telemetria-progress-fill'));

    // Estado zerado gracioso
    if (!rawText || rawText.trim().length === 0) {
        if (linesValEl) {
            linesValEl.textContent = '0 / 30 linhas estimadas';
            linesValEl.className = 'telemetria-lines-badge status-under';
        }
        if (badgesContainer) {
            badgesContainer.innerHTML = `
                <span class="telemetria-p-badge" title="Introdução">Intro: 0/7L</span>
                <span class="telemetria-p-badge" title="Desenvolvimento 1">Desenv 1: 0/8L</span>
                <span class="telemetria-p-badge" title="Desenvolvimento 2">Desenv 2: 0/8L</span>
                <span class="telemetria-p-badge" title="Conclusão">Conclusão: 0/7L</span>
            `;
        }
        if (charsValEl) charsValEl.textContent = '0 / 2.820 carac.';
        if (progressFill) {
            progressFill.style.width = '0%';
            progressFill.className = 'telemetria-progress-fill fill-under';
        }
        return;
    }

    const metrics = analyzeEssayText(rawText);

    // 1. Linhas Totais Físicas
    if (linesValEl) {
        linesValEl.textContent = `${metrics.totalEstimatedLines} / 30 linhas estimadas`;
        linesValEl.className = 'telemetria-lines-badge';
        if (metrics.status === 'IDEAL') {
            linesValEl.classList.add('status-ideal');
        } else if (metrics.status === 'OVER_LIMIT') {
            linesValEl.classList.add('status-over');
        } else {
            linesValEl.classList.add('status-under');
        }
    }

    // 2. Micro-Badges por Parágrafo
    if (badgesContainer) {
        const defaultTargets = [7, 8, 8, 7];
        const badgesHtml = [];
        const count = Math.max(4, metrics.paragraphs.length);

        for (let i = 0; i < count; i++) {
            const p = metrics.paragraphs[i];
            const abbr = PARAGRAPH_ABBR[i] || `P${i + 1}`;
            const target = p ? p.targetLines : (defaultTargets[i] || 7);
            const estimated = p ? p.estimatedLines : 0;
            const isOver = p ? p.isOverflown : false;
            const isActive = estimated > 0;

            let badgeClass = 'telemetria-p-badge';
            if (isOver) {
                badgeClass += ' telemetria-p-overflow';
            } else if (isActive) {
                badgeClass += ' telemetria-p-active';
            }

            const title = p ? p.label : abbr;
            badgesHtml.push(`<span class="${badgeClass}" title="${title}">${abbr}: ${estimated}/${target}L</span>`);
        }
        badgesContainer.innerHTML = badgesHtml.join('');
    }

    // 3. Densidade de Caracteres e Barra de Progresso Semântica
    if (charsValEl) {
        charsValEl.textContent = `${metrics.totalCharsWithSpaces.toLocaleString('pt-BR')} / 2.820 carac.`;
    }

    if (progressFill) {
        const percent = Math.min(100, Math.round((metrics.totalCharsWithSpaces / TARGET_TOTAL_CHARS) * 100));
        progressFill.style.width = `${percent}%`;
        progressFill.className = 'telemetria-progress-fill';
        if (metrics.status === 'IDEAL') {
            progressFill.classList.add('fill-ideal');
        } else if (metrics.status === 'OVER_LIMIT') {
            progressFill.classList.add('fill-over');
        } else {
            progressFill.classList.add('fill-under');
        }
    }
}

/**
 * Inicializa a escuta de eventos e instanciação do Co-piloto e HUD
 */
export function initLiveFeedback() {
    const essayTextarea = /** @type {HTMLTextAreaElement|null} */ (document.getElementById('essay'));
    const panel = document.getElementById('live-feedback-panel');
    const msgElement = document.getElementById('live-feedback-msg');

    if (!essayTextarea) {
        console.warn('Textarea #essay não encontrado para inicialização da telemetria.');
        return;
    }

    const hud = ensureTelemetryHud();

    // Debounce de 350ms para evitar reflows desnecessários na digitação
    const onInputDebounced = debounce((/** @type {string} */ text) => {
        updateTelemetryHud(hud, text);

        if (panel && msgElement) {
            const feedback = analyzeText(text);
            if (feedback) {
                msgElement.textContent = feedback;
                panel.style.display = 'flex';
            } else {
                panel.style.display = 'none';
            }
        }
    }, 350);

    essayTextarea.addEventListener('input', (e) => {
        // @ts-ignore
        const text = e.target.value || '';
        onInputDebounced(text);
    });

    // Estado inicial síncrono
    updateTelemetryHud(hud, essayTextarea.value || '');
}

/**
 * Análise de regras textuais rápidas (repetição, tamanho bruto)
 * @param {string} text 
 * @returns {string | null}
 */
function analyzeText(text) {
    if (!text || text.trim().length === 0) return null;

    // 1. Checagem de Repetição de Palavras
    const words = text.toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.has(w));

    /** @type {Record<string, number>} */
    const wordCounts = {};
    for (const w of words) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
    }

    for (const [word, count] of Object.entries(wordCounts)) {
        if (count > 4) {
            return `A palavra "${word.toUpperCase()}" já foi repetida ${count} vezes. Tente usar um sinônimo!`;
        }
    }

    // 2. Checagem de parágrafos muito longos (> 80 palavras)
    const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
    for (let i = 0; i < paragraphs.length; i++) {
        const pLength = paragraphs[i].split(/\s+/).length;
        if (pLength > 80) {
            return `O parágrafo ${i + 1} está muito longo (mais de 80 palavras). Considere dividi-lo com ponto final.`;
        }
    }

    // 3. Conexão Arena ↔ Co-piloto (Lê fraquezas salvas)
    try {
        const weaknesses = JSON.parse(localStorage.getItem('redacao_weaknesses') || '{}');
        let dominantWeakness = null;
        let maxErrors = 0;
        
        for (const [category, errors] of Object.entries(weaknesses)) {
            // @ts-ignore
            if (errors > 2 && errors > maxErrors) {
                // @ts-ignore
                maxErrors = errors;
                dominantWeakness = category;
            }
        }

        if (dominantWeakness) {
            return `⚠️ Atenção: Na Arena você identificou fragilidade em "${dominantWeakness}". Fique atento a isso nesta redação!`;
        }
    } catch(e) {
        console.warn('Erro ao ler fraquezas', e);
    }

    return null;
}

// Inicializa automaticamente quando o módulo ESM carrega
initLiveFeedback();
